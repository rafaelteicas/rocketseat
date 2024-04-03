'use client'

import { Stars } from '@/components/stars'
import { Text } from '@/components/text'
import React from 'react'
import Image from 'next/image'
import { BookOpen, BookmarkSimple } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'

interface BookCardProps {
  bookId: string
}

interface BookProps {
  book: {
    id: string // '375948a7-bca3-4b59-9f97-bfcde036b4ca'
    name: string // 'O Hobbit'
    author: string // 'J.R.R. Tolkien'
    summary: string // 'Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh'
    cover_url: string // 'images/books/o-hobbit.png'
    total_pages: number // 360
    created_at: string // '2024-03-25T21:08:39.341Z'
  }
  category: string
  ratings: {
    rate: number[]
    media: number
  }
}

export function BookCard({ bookId }: BookCardProps) {
  const { data: bookData } = useQuery<void, Error, BookProps>({
    queryKey: ['get-book', bookId],
    queryFn: async () => {
      const response = await api.get(`/books/${bookId}`)
      const bookData = response.data
      return bookData
    },
  })

  if (bookData) {
    return (
      <div className="p-12 flex flex-col bg-gray-700 rounded-[10px] gap-10">
        <div className="flex flex-row gap-8">
          <Image
            width={171}
            height={242}
            src={`/${bookData.book.cover_url}`}
            alt="Imagem"
          />
          <div className="flex flex-col">
            <Text preset="headingSmall" className="text-gray-100">
              {bookData.book.name}
            </Text>
            <Text preset="textMedium" className="text-gray-300 mt-2">
              {bookData.book.author}
            </Text>
            <Stars rating={bookData.ratings.media} className="mt-auto" />
            <Text preset="textSmall" className="text-gray-400 mt-2">
              {bookData.ratings.rate.length} avaliações
            </Text>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-600" />
        <div className="px-4 flex items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <BookmarkSimple size={24} className="fill-green-100" />
            <div>
              <Text preset="textSmall" className="text-gray-300">
                Categoria
              </Text>
              <Text preset="headingExtraSmall" className="text-gray-200">
                {bookData.category}
              </Text>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <BookOpen size={24} className="fill-green-100" />
            <div>
              <Text preset="textSmall" className="text-gray-300">
                Páginas
              </Text>
              <Text preset="headingExtraSmall" className="text-gray-200">
                {bookData.book.total_pages}
              </Text>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
