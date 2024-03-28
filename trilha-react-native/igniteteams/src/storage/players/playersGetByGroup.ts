import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keys } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDto";

export async function playersGetByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(`${Keys.PLAYER_COLLECTION}-${group}`)
    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];
    return players
  }
  catch (error) {
    throw error;
  }
}