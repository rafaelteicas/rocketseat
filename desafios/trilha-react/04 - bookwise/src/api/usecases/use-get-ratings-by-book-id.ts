import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { RatingModel } from '../models/rating'

export function useGetRatingsByBookId(bookId: string) {
  const { data, isLoading, isError, refetch } = useQuery<
    void,
    Error,
    RatingModel[]
  >({
    queryKey: ['get-ratings', bookId],
    queryFn: async () => {
      const response = await api.get(`/ratings/${bookId}`)
      const ratingsData = response.data.ratings
      return ratingsData
    },
  })

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
