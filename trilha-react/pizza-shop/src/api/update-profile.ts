import { api } from '@/lib/axios'

type UpdateProfileBody = {
  name: string
  description: string | null
}

export default async function updateProfile({
  description,
  name,
}: UpdateProfileBody) {
  await api.put('/profile', {
    description,
    name,
  })
}
