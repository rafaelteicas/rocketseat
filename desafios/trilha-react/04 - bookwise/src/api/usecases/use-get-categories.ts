import { useQuery } from '@tanstack/react-query'
import { CategoryModel } from '../models/category'
import { api } from '@/lib/axios'

export function useGetCategories() {
  const { data, isLoading } = useQuery<void, Error, CategoryModel[]>({
    queryKey: ['get-categories'],
    queryFn: async () => {
      const response = await api.get('/categories')
      return response.data.result
    },
  })

  return {
    categories: data,
    isLoading,
  }
}
