import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { PopularBooksModel } from '../models/popular-book'

export function useGetPopularBooks(limit?: number) {
  const { data, isLoading } = useQuery<void, Error, PopularBooksModel[]>({
    queryKey: ['get-popular-books'],
    queryFn: async () => {
      const response = await api.get('/books/popular', {
        params: {
          limit,
        },
      })
      return response.data.books
    },
  })

  return {
    popularBooks: data,
    isLoading,
  }
}
