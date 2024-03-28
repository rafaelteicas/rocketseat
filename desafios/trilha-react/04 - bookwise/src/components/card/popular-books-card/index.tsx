import React from 'react'
import Image from 'next/image'
import { Text } from '@/components/text'
import livro from '@/assets/livro.jpeg'
import { Stars } from '@/components/stars'

interface PopularBooksProps {
  title: string
  author: string
  rate: number
}

export function PopularBooksCard({ author, rate, title }: PopularBooksProps) {
  return (
    <div className="p-4 bg-gray-700 rounded-lg flex flex-row gap-4">
      <Image src={livro} alt="" className="w-16 h-24 rounded" />
      <div className="flex flex-col">
        <Text preset="headingExtraSmall" className="text-gray-100">
          {title}
        </Text>
        <Text preset="textSmall" className="text-gray-400">
          {author}
        </Text>
        <Stars rating={rate} className="mt-auto" />
      </div>
    </div>
  )
}
