import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { ReviewModel } from '../models/review'

export function useGetReviews() {
  const { data, isLoading } = useQuery<void, Error, ReviewModel[]>({
    queryKey: ['get-reviews'],
    queryFn: async () => {
      const response = await api.get('/books/reviews')
      return response.data.ratings
    },
  })

  return {
    reviews: data,
    isLoading,
  }
}
