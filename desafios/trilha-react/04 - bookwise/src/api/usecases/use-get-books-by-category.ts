import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { BookModel } from '../models/book'

export function useGetBooksByCategory(categoryName: string, userId?: string) {
  const { data, isLoading } = useQuery<void, Error, BookModel[]>({
    queryKey: ['get-category-by-name', categoryName],
    queryFn: async () => {
      const response = await api.get(`/categories/books`, {
        params: {
          name: categoryName,
          userId,
        },
      })
      return response.data.result
    },
    staleTime: 5,
  })

  return {
    booksByCategory: data,
    isLoading,
  }
}
