/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ChartLineUp } from '@phosphor-icons/react'
import { formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { useGetPopularBooks } from '@/api/usecases/use-get-popular-books'
import { useGetReviews } from '@/api/usecases/use-get-reviews'
import { PopularBooksCard } from '@/components/card/popular-books-card'
import { ReviewCard } from '@/components/card/review-card'
import { Stars } from '@/components/stars'
import { Skeleton } from '@/components/ui/skeleton'

const LIMITED_BOOKS_RESPONSE = 4

export default function Home() {
  const session = useSession()

  const { reviews, isLoading } = useGetReviews(session.data?.user?.id)
  const { popularBooks, isLoading: isLoadingPopular } = useGetPopularBooks(
    LIMITED_BOOKS_RESPONSE,
  )

  return (
    <section className="flex w-full flex-col pt-6 ">
      <h1 className="flex flex-row items-center gap-3 pb-10 leading-none">
        <ChartLineUp size={32} className="fill-green-100" />
        Início
      </h1>
      <div className="grid grid-cols-[680px_auto] gap-8">
        <div className="flex flex-1 flex-col">
          {reviews?.lastRatedBook && (
            <div className="mb-10">
              <p className="mb-4">Sua última leitura</p>
              <div className="flex max-h-[200px] flex-row gap-5 overflow-hidden rounded-lg bg-gray-600 p-6">
                <Image
                  alt=""
                  src={`/${reviews.lastRatedBook.book.cover_url}`}
                  width={108}
                  height={152}
                />
                <div className="flex flex-1 flex-col">
                  <div className="mb-4 flex flex-row justify-between">
                    <p className="text-gray-300">
                      Há{' '}
                      {formatDistanceToNowStrict(
                        reviews.lastRatedBook.created_at,
                        {
                          locale: ptBR,
                        },
                      )}
                    </p>
                    <Stars rating={reviews.lastRatedBook.rate} />
                  </div>
                  <div className="mb-6 flex flex-col">
                    <h3>{reviews.lastRatedBook.book.name}</h3>
                    <p>{reviews.lastRatedBook.book.author}</p>
                  </div>
                  <p className="mt-auto">{reviews.lastRatedBook.description}</p>
                </div>
              </div>
            </div>
          )}

          <p className="mb-4">Avaliações mais recentes</p>
          {isLoading && (
            <Skeleton className="">
              <div className="space-y-4">
                {Array.from(Array(5).keys()).map((_, i) => (
                  <div className="h-60 w-full rounded-lg bg-gray-700" key={i} />
                ))}
              </div>
            </Skeleton>
          )}
          <div className="flex flex-col gap-3">
            {reviews?.ratings.map((review) => (
              <ReviewCard
                key={review.id}
                userId={review.user.id}
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
            <p className="mb-4">Livros populares</p>
            <Link
              href={'/app/explore'}
              className="text-sm font-bold text-purple-100 hover:text-purple-100/80"
            >
              Ver todos
            </Link>
          </div>

          {isLoadingPopular && (
            <Skeleton className="">
              <div className="space-y-4">
                {Array.from(Array(4).keys()).map((_, i) => (
                  <div className="h-28 w-full rounded-lg bg-gray-700" key={i} />
                ))}
              </div>
            </Skeleton>
          )}
          {popularBooks?.map((book) => (
            <PopularBooksCard
              key={book.id}
              bookId={book.id}
              author={book.author}
              title={book.name}
              image={book.cover_url}
              rate={book.ratings.media}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
