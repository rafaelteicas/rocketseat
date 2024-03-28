import AsyncStorage from "@react-native-async-storage/async-storage"
import { Keys } from "@storage/storageConfig"
import { playersGetByGroup } from "./playersGetByGroup"
import { PlayerStorageDTO } from "./PlayerStorageDto"
import { AppError } from "@utils/AppError"

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storagePlayers = await playersGetByGroup(group)
    const playedAlreadyExists = storagePlayers.filter(player => newPlayer.name === player.name)
    if (playedAlreadyExists.length > 0) {
      throw new AppError("Essa pessoa já está em um time")
    }
    const storage = JSON.stringify([...storagePlayers, newPlayer])
    await AsyncStorage.setItem(`${Keys.PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error;
  }
}