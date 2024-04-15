import { Stars } from '@/components/stars'
import React from 'react'
import Image from 'next/image'
import { BookOpen, BookmarkSimple } from '@phosphor-icons/react'
import { useGetBookById } from '@/api/usecases/use-get-book-by-id'

interface BookCardProps {
  bookId: string
}

export function BookCard({ bookId }: BookCardProps) {
  const { data } = useGetBookById(bookId)

  if (data) {
    return (
      <div className="flex flex-col gap-10 rounded-[10px] bg-gray-700 p-12">
        <div className="flex flex-row gap-8">
          <Image
            width={171}
            height={242}
            src={`/${data.book.cover_url}`}
            alt="Imagem"
          />
          <div className="flex flex-col">
            <h3 className="text-gray-100">{data.book.name}</h3>
            <p className="mt-2 text-base font-medium leading-4 text-gray-300">
              {data.book.author}
            </p>
            <Stars rating={data.ratings.media} className="mt-auto" />
            <p className="mt-2 text-gray-400">
              {data.ratings.rate.length} avaliações
            </p>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-600" />
        <div className="flex items-center justify-between px-4">
          <div className="flex flex-row items-center gap-4">
            <BookmarkSimple size={24} className="fill-green-100" />
            <div>
              <p className="text-gray-300">Categoria</p>
              <h4 className="text-gray-200">{data.category}</h4>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <BookOpen size={24} className="fill-green-100" />
            <div>
              <p className="text-gray-300">Páginas</p>
              <h4 className="text-gray-200">{data.book.total_pages}</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
