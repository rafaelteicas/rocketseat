import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { PopularBooksModel } from '../models/popular-book'

export function useGetPopularBooks() {
  const { data, isLoading } = useQuery<void, Error, PopularBooksModel[]>({
    queryKey: ['get-popular-books'],
    queryFn: async () => {
      const response = await api.get('/books/popular')

      return response.data.books
    },
  })

  return {
    popularBooks: data,
    isLoading,
  }
}
