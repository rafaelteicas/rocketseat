import { Check, Star, X } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

import { useGetRatingsByBookId } from '@/api/usecases/use-get-ratings-by-book-id'
import { Avatar } from '@/components/avatar'
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
  const queryClient = useQueryClient()
  const { refetch } = useGetRatingsByBookId(bookId)

  const { mutate } = useMutation<void, Error, DataDTO>({
    mutationFn: async (data) => {
      await api.post('/ratings', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-books'],
      })
      refetch()
      setOpinion('')
    },
  })

  if (session) {
    return (
      <div className="mb-3 flex flex-col rounded-[10px] bg-gray-700 p-6">
        <header className="flex flex-row items-center pb-6">
          <div className="flex flex-1 items-center gap-4">
            <Avatar avatarUri={session.data?.user?.image || ''} />
            <h4 className="text-gray-100">{session.data?.user?.name}</h4>
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
          className="mb-3 rounded-[4px] bg-gray-800 p-4 outline-0 focus:shadow-[0_0_0_1px] focus:shadow-green-200"
        />
        <footer className="flex flex-1 justify-end gap-2">
          <button
            className="rounded-[4px] bg-gray-600 p-2 hover:bg-gray-800 hover:duration-100"
            onClick={() => setOpinion('')}
          >
            <X size={24} className="fill-purple-100" />
          </button>
          <button
            className="rounded-[4px] bg-gray-600 p-2 hover:bg-gray-800 hover:duration-100"
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
