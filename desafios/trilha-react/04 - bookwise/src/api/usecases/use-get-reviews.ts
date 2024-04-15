import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { ReviewModel } from '../models/review'

export function useGetReviews(userId?: string) {
  const { data, isLoading } = useQuery<void, Error, ReviewModel>({
    queryKey: ['get-reviews'],
    queryFn: async () => {
      const response = await api.get('/books/reviews', {
        params: {
          userId,
        },
      })
      return response.data
    },
  })

  return {
    reviews: data,
    isLoading,
  }
}
