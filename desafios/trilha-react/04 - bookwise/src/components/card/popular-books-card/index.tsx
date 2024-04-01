import React from 'react'
import Image from 'next/image'
import { Text } from '@/components/text'
import { Stars } from '@/components/stars'

interface PopularBooksProps {
  title: string
  author: string
  rate: number
  image: string
}

export function PopularBooksCard({
  author,
  rate,
  title,
  image,
}: PopularBooksProps) {
  return (
    <div className="p-4 bg-gray-700 rounded-lg flex flex-row gap-4 mb-4">
      <Image
        src={`/${image}`}
        alt="cover"
        className="rounded"
        width={64}
        height={64}
      />
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
