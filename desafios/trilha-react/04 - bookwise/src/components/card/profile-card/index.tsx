import React from 'react'
import Image from 'next/image'
import { Text } from '@/components/text'
import { Stars } from '@/components/stars'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ProfileCardProps {
  book: {
    name: string
    author: string
    cover_url: string
  }
  rating: number
  opinion: string
  date: string
}

export function ProfileCard({ book, rating, opinion, date }: ProfileCardProps) {
  return (
    <div>
      <Text preset="textSmall" className="text-gray-300 capitalize pb-2">
        {formatRelative(date, new Date(), {
          locale: ptBR,
        })}
      </Text>
      <div className="bg-gray-700 p-6 rounded-lg ">
        <header className="pb-7 flex flex-row gap-4">
          <Image
            width={108}
            height={152}
            src={`/${book.cover_url}`}
            alt=""
            className="rounded"
          />
          <div className="flex flex-col">
            <Text preset="headingExtraSmall" className="mb-2">
              {book.author}
            </Text>
            <Text preset="textSmall" className="text-gray-400">
              {book.name}
            </Text>
            <Stars rating={rating} className="mt-auto" />
          </div>
        </header>
        <div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col">
              <Text preset="textSmall" className="text-gray-300 mt-4">
                {opinion}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
