/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useGetPopularBooks } from '@/api/usecases/use-get-popular-books'
import { useGetReviews } from '@/api/usecases/use-get-reviews'
import { PopularBooksCard } from '@/components/card/popular-books-card'
import { ReviewCard } from '@/components/card/review-card'
import { Text } from '@/components/text'
import { ChartLineUp } from '@phosphor-icons/react'

export default function Home() {
  const { reviews, isLoading } = useGetReviews()

  const { popularBooks } = useGetPopularBooks()

  if (isLoading) {
    return <p>Carregando</p>
  }

  if (reviews) {
    return (
      <section className="pt-6 flex flex-col w-full ">
        <Text
          preset="headingLarge"
          className="flex flex-row gap-3 pb-10 leading-none items-center"
        >
          <ChartLineUp size={32} className="fill-green-100" />
          Início
        </Text>
        <div className="grid grid-cols-[680px_auto] gap-8">
          <div className="flex flex-col flex-1">
            <Text preset="textSmall" className="mb-4">
              Avaliações mais recentes
            </Text>
            <div className="flex flex-col gap-3">
              {reviews.map((review) => (
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
            {popularBooks?.map((book) => (
              <PopularBooksCard
                key={book.id}
                author={book.author}
                title={book.name}
                image={book.cover_url}
                rate={4}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
}
