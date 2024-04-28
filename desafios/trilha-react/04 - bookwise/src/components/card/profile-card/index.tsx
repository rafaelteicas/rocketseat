import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import React from 'react'

import { Stars } from '@/components/stars'

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
      <p className="pb-2 pt-6 capitalize text-gray-300">
        {formatDistanceToNowStrict(date, {
          locale: ptBR,
          addSuffix: true,
        })}
      </p>
      <div className="rounded-lg bg-gray-700 p-6 ">
        <header className="flex flex-row gap-4 pb-7">
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
            <Stars rating={rating} className="mt-auto" />
          </div>
        </header>
        <div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col">
              <p className="mt-4 text-gray-300">{opinion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
