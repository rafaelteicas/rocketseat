import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupsGetAll";
import { Keys } from "@storage/storageConfig";

export async function groupRemoveByName(groupName: string) {
  try {
    const storedGroups = await groupsGetAll()
    const groups = storedGroups.filter(group => group !== groupName)
    await AsyncStorage.setItem(Keys.GROUP_COLLECTION, JSON.stringify(groups))
    await AsyncStorage.removeItem(`${Keys.PLAYER_COLLECTION}-${groupName}`)
  } catch (error) {
    throw error;
  }
}