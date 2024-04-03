import { Avatar } from '@/components/avatar'
import React from 'react'
import { Text } from '@/components/text'
import { Stars } from '@/components/stars'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface RatingCardProps {
  bookId: string
}

interface RatingsData {
  id: string // '321cb9b7-60f2-4b68-955e-0ff5d254c341'
  rate: number // 4
  description: string // 'Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit porta eget nec vitae sit vulputate eget'
  created_at: string // '2024-03-25T21:08:39.341Z'
  book_id: string // 'c8176d86-896a-4c21-9219-6bb28cccaa5f'
  user_id: string // '48e458c0-8b1e-4994-b85a-1e1cfcc9dd60'
  user: {
    id: string // '48e458c0-8b1e-4994-b85a-1e1cfcc9dd60'
    name: string // 'Jaxson Dias'
    avatar_url: string // 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
    created_at: string // '2024-03-25T21:08:39.341Z'
  }
}

export function RatingsCard({ bookId }: RatingCardProps) {
  const { data: ratings } = useQuery<void, Error, RatingsData[]>({
    queryKey: ['get-ratings', bookId],
    queryFn: async () => {
      const response = await api.get(`/ratings/${bookId}`)
      const ratingsData = response.data.ratings
      return ratingsData
    },
  })

  if (ratings) {
    return ratings.map((rating) => (
      <div className="p-6 bg-gray-700 rounded-lg mb-3" key={rating.id}>
        <header className="flex flex-row flex-1">
          <div className="flex flex-1 gap-4">
            <Avatar size={40} avatarUri={rating.user.avatar_url} />
            <div>
              <Text preset="headingExtraSmall" className="text-gray-100">
                {rating.user.name}
              </Text>
              <Text preset="textSmall" className="text-gray-400 capitalize">
                {formatDistanceToNowStrict(rating.created_at, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </Text>
            </div>
          </div>
          <Stars rating={rating.rate} />
        </header>
        <Text preset="textSmall" className="text-gray-300 pt-5">
          {rating.description}
        </Text>
      </div>
    ))
  }
}
