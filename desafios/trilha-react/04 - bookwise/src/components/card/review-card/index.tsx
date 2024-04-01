import { Text } from '@/components/text'
import Image from 'next/image'
import React from 'react'
import { Avatar } from '@/components/avatar'
import { Stars } from '@/components/stars'
import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

interface ReviewCardProps {
  author: string
  date: string
  rating: number
  description: string
  avatar: string
  book: {
    name: string
    author: string
    cover_url: string
  }
}

export function ReviewCard({
  author,
  book,
  date,
  rating,
  avatar,
  description,
}: ReviewCardProps) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg ">
      <header className="pb-7 flex flex-row gap-4">
        <Avatar avatarUri={avatar} />
        <div className="flex items-baseline flex-col flex-1">
          <Text preset="textMedium" className="mb-2">
            {author}
          </Text>
          <Text preset="textSmall" className="text-gray-400">
            {formatDistanceToNowStrict(date, { locale: ptBR })}
          </Text>
        </div>
        <Stars rating={rating} />
      </header>
      <div>
        <div className="flex flex-row gap-5">
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
            <Text preset="textSmall" className="text-gray-300 mt-4">
              {description}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
