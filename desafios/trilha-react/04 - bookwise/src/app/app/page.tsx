'use client'

import { PopularBooksCard } from '@/components/card/popular-books-card'
import { ReviewCard } from '@/components/card/review-card'
import { Text } from '@/components/text'
import { ChartLineUp } from '@phosphor-icons/react'

export default function Home() {
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
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
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
          <PopularBooksCard />
        </div>
      </div>
    </section>
  )
}
