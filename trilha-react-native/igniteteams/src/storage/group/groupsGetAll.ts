import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keys } from "@storage/storageConfig";

export async function groupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(Keys.GROUP_COLLECTION)
    const groups: string[] = storage ? JSON.parse(storage) : []
    return groups
  } catch (error) {
    throw error;
  }
}