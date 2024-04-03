import React, { useContext } from 'react'
import Image from 'next/image'
import { Text } from '@/components/text'
import { Stars } from '@/components/stars'
import { SidePanelContext } from '@/service/side-panel/side-panel-context'

interface PopularBooksProps {
  title: string
  author: string
  rate: number
  image: string
  bookId: string
}

export function PopularBooksCard({
  author,
  rate,
  title,
  image,
  bookId,
}: PopularBooksProps) {
  const { openSidePanel } = useContext(SidePanelContext)

  return (
    <button
      onClick={() => openSidePanel(bookId)}
      className="p-4 w-full bg-gray-700 rounded-lg border border-gray-700 flex flex-row gap-4 mb-4 text-left flex-1 hover:border hover:border-gray-600"
    >
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
    </button>
  )
}
