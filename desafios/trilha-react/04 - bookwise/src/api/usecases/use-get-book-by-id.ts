import { api } from '@/lib/axios'
import { BookModel } from '../models/book'
import { useQuery } from '@tanstack/react-query'

interface BookProps {
  book: BookModel
  category: string
  ratings: {
    rate: number[]
    media: number
  }
}

export function useGetBookById(bookId: string) {
  const { data, isLoading, isError } = useQuery<void, Error, BookProps>({
    queryKey: ['get-book', bookId],
    queryFn: async () => {
      const response = await api.get(`/books/${bookId}`)
      const bookData = response.data
      return bookData
    },
  })

  return {
    data,
    isLoading,
    isError,
  }
}
