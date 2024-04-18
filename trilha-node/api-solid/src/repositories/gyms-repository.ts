import { Gym, Prisma } from '@prisma/client'

export type FindManyNearby = {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  fetchManyNearby(params: FindManyNearby): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
