import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { BookModel } from '../models/book'

export function useGetBooks(userId?: string) {
  const { data, isLoading } = useQuery<void, Error, BookModel[]>({
    queryKey: ['get-books'],
    queryFn: async () => {
      const response = await api.get('/books', {
        params: {
          userId,
        },
      })
      return response.data.books
    },
    staleTime: 5,
  })

  return {
    books: data,
    isLoading,
  }
}
