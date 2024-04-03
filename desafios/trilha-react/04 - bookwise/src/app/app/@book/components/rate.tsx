import React, { useState } from 'react'
import { Avatar } from '@/components/avatar'
import { useSession } from 'next-auth/react'
import { Text } from '@/components/text'
import { Check, Star, X } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/axios'

interface DataDTO {
  rating: number
  description: string
  bookId: string
  userEmail: string
}

interface RateProps {
  bookId: string
}

export function Rate({ bookId }: RateProps) {
  const [opinion, setOpinion] = useState('')
  const [rating, setRating] = useState(1)
  const session = useSession()

  const { mutate } = useMutation<void, Error, DataDTO>({
    mutationFn: async (data) => {
      const response = await api.post('/ratings', data)
      console.log(response.data)
    },
  })

  if (session) {
    return (
      <div className="p-6 flex flex-col bg-gray-700 rounded-[10px] mb-3">
        <header className="flex flex-row items-center pb-6">
          <div className="flex flex-1 items-center gap-4">
            <Avatar avatarUri={session.data?.user?.image || ''} />
            <Text preset="headingExtraSmall" className="text-gray-100">
              {session.data?.user?.name}
            </Text>
          </div>
          {Array.from(Array(5).keys()).map((_, i) => (
            <button key={i}>
              <Star
                key={i}
                size={16}
                weight={rating >= i + 1 ? 'fill' : 'regular'}
                className="fill-purple-100 hover:scale-125"
                onClick={() => setRating(i + 1)}
              />
            </button>
          ))}
        </header>
        <textarea
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
          maxLength={450}
          className="bg-gray-800 p-4 outline-0 rounded-[4px] focus:shadow-[0_0_0_1px] focus:shadow-green-200 mb-3"
        />
        <footer className="flex gap-2 flex-1 justify-end">
          <button className="p-2 bg-gray-600 rounded-[4px] hover:bg-gray-800 hover:duration-100">
            <X size={24} className="fill-purple-100" />
          </button>
          <button
            className="p-2 bg-gray-600 rounded-[4px] hover:bg-gray-800 hover:duration-100"
            onClick={() =>
              mutate({
                rating,
                description: opinion,
                bookId,
                userEmail: session.data?.user?.email as string,
              })
            }
          >
            <Check size={24} className="fill-green-100" />
          </button>
        </footer>
      </div>
    )
  }
}
