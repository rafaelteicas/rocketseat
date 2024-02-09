import { api } from '@/lib/axios'

type GetManagedRestaurantResponse = {
  id: string
  name: string
  description: string | null
  managerId: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant',
  )
  return response.data
}
