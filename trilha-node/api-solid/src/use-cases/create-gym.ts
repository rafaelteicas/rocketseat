import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

type CreateGymUseCaseRequest = {
  title: string
  description: string
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    description,
    phone,
    title,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      description,
      phone,
      title,
      latitude,
      longitude,
    })

    return { gym }
  }
}
