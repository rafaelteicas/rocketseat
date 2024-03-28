import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersGetByGroup } from "./playersGetByGroup";
import { Keys } from "@storage/storageConfig";

export async function playerRemoveByGroup(playerName: string, groupName: string) {
  try {
    const storage = await playersGetByGroup(groupName)
    const filtered = storage.filter(player => player.name !== playerName)
    const players = JSON.stringify(filtered)
    await AsyncStorage.setItem(`${Keys.PLAYER_COLLECTION}-${groupName}`, players)
  } catch (error) {
    throw error;
  }
}