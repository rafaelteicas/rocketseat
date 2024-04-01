import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { BookModel } from '../models/book'

export function useGetBooks() {
  const { data, isLoading } = useQuery<void, Error, BookModel[]>({
    queryKey: ['all-cards'],
    queryFn: async () => {
      const response = await api.get('/books')
      return response.data.books
    },
    staleTime: 5,
  })

  return {
    books: data,
    isLoading,
  }
}
