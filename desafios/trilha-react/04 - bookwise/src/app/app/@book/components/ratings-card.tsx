import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React from 'react'

import { useGetRatingsByBookId } from '@/api/usecases/use-get-ratings-by-book-id'
import { Avatar } from '@/components/avatar'
import { Stars } from '@/components/stars'

interface RatingCardProps {
  bookId: string
}

export function RatingsCard({ bookId }: RatingCardProps) {
  const { data } = useGetRatingsByBookId(bookId)

  if (data) {
    return data.map((rating) => (
      <div className="mb-3 rounded-lg bg-gray-700 p-6" key={rating.id}>
        <header className="flex flex-1 flex-row">
          <div className="flex flex-1 gap-4">
            <Avatar size={40} avatarUri={rating.user.avatar_url} />
            <div>
              <h4 className="text-gray-100">{rating.user.name}</h4>
              <p className="capitalize text-gray-400">
                {formatDistanceToNowStrict(rating.created_at, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <Stars rating={rating.rate} />
        </header>
        <p className="pt-5 text-gray-300">{rating.description}</p>
      </div>
    ))
  }
}
