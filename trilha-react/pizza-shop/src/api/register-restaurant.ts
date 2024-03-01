import { api } from '@/lib/axios'

export interface registerRestaurantBody {
  email: string
  restaurantName: string
  managerName: string
  phone: string
}

export async function registerRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: registerRestaurantBody) {
  await api.post('/restaurants', { email, managerName, phone, restaurantName })
}
