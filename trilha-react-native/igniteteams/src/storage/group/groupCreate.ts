import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keys } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupsGetAll()
    const groupAlreadyExists = storedGroups.includes(newGroupName)
    if (groupAlreadyExists) {
      throw new AppError("Já existe um grupo cadastrado com esse nome")
    }
    const storage = JSON.stringify( [...storedGroups, newGroupName])
    await AsyncStorage.setItem(Keys.GROUP_COLLECTION, storage)
  }
  catch (error) {
    throw error;
  }
}