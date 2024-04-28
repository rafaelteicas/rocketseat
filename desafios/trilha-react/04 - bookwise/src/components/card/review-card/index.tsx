import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Avatar } from '@/components/avatar'
import { Stars } from '@/components/stars'

interface ReviewCardProps {
  userId: string
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
  userId,
  author,
  book,
  date,
  rating,
  avatar,
  description,
}: ReviewCardProps) {
  return (
    <div className="rounded-lg bg-gray-700 p-6 ">
      <header className="flex flex-row pb-7">
        <Link href={`/app/profile/${userId}`} className="flex flex-1 gap-4 ">
          <Avatar avatarUri={avatar} />
          <div className="flex flex-1 flex-col items-baseline">
            <p className="mb-2 text-base font-medium leading-4">{author}</p>
            <p className="text-gray-400">
              {formatDistanceToNowStrict(date, { locale: ptBR })}
            </p>
          </div>
        </Link>
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
            <h4 className="mb-2">{book.author}</h4>
            <p className="text-gray-400">{book.name}</p>
            <p className="mt-4 text-gray-300">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
