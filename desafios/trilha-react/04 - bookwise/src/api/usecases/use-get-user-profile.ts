import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { UserModel } from '../models/user'

export function useGetUserProfile(userId: string) {
  const { data, isLoading, isError } = useQuery<void, Error, UserModel>({
    queryKey: ['get-user-profile', userId],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`)
      const user = response.data.user
      return user
    },
  })

  return {
    data,
    isLoading,
    isError,
  }
}
