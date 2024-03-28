/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PopularBooksCard } from '@/components/card/popular-books-card'
import { ReviewCard } from '@/components/card/review-card'
import { Text } from '@/components/text'
import { api } from '@/lib/axios'
import { ChartLineUp } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data, isLoading } = useQuery<any, Error, any[]>({
    queryKey: ['get-reviews'],
    queryFn: async () => {
      const response = await api.get('/books/reviews')
      return response.data.ratings
    },
  })

  const { data: popularBooks } = useQuery<any, Error, any>({
    queryKey: ['get-popular-books'],
    queryFn: async () => {
      const response = await api.get('/books/popular')
      return response.data.ratings
    },
  })

  if (isLoading) {
    return <p>Carregando</p>
  }

  if (data) {
    return (
      <section className="pt-6 flex flex-col w-full ">
        <Text
          preset="headingLarge"
          className="flex flex-row gap-3 pb-10 leading-none"
        >
          <ChartLineUp size={32} className="fill-green-100" />
          Início
        </Text>
        <div className="flex gap-8 jusc">
          <div className="flex flex-col flex-1">
            <Text preset="textSmall" className="mb-4">
              Avaliações mais recentes
            </Text>
            <div className="flex flex-col gap-3">
              {data.map((review) => (
                <ReviewCard
                  key={review.id}
                  author={review.user.name}
                  book={review.book}
                  date={review.created_at}
                  description={review.description}
                  rating={review.rate}
                  avatar={review.user.avatar_url}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-between">
              <Text preset="textSmall" className="mb-4">
                Livros populares
              </Text>
              <Text preset="buttonSmall" className="text-purple-100">
                Ver todos
              </Text>
            </div>
            {popularBooks && (
              <PopularBooksCard
                author={popularBooks.author}
                title={popularBooks.name}
                rate={popularBooks.rating}
              />
            )}
          </div>
        </div>
      </section>
    )
  }
}
