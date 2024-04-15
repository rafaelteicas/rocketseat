import React, { useContext } from 'react'
import Image from 'next/image'
import { Stars } from '@/components/stars'
import { SidePanelContext } from '@/service/side-panel/side-panel-context'

interface PopularBooksProps {
  title: string
  author: string
  rate: number
  image: string
  bookId: string
  alreadyRated?: boolean
}

export function PopularBooksCard({
  author,
  rate,
  title,
  image,
  bookId,
  alreadyRated,
}: PopularBooksProps) {
  const { openSidePanel } = useContext(SidePanelContext)

  return (
    <button
      onClick={() => openSidePanel(bookId)}
      className="relative mb-4  w-full flex-1 flex-row gap-4 overflow-hidden rounded-lg bg-gray-700 p-4 text-left hover:shadow-cardHover hover:shadow-gray-600"
    >
      {alreadyRated && (
        <span className="absolute right-0 top-0 rounded-bl-md bg-green-300 px-3 py-1 text-xs font-bold text-green-100">
          LIDO
        </span>
      )}
      <div className="flex gap-4">
        <Image
          src={`/${image}`}
          alt="cover"
          className="rounded"
          width={64}
          height={64}
        />
        <div className="flex flex-1 flex-col">
          <h4 className="text-gray-100">{title}</h4>
          <p className="text-gray-400">{author}</p>
          <Stars rating={rate} className="mt-auto " />
        </div>
      </div>
    </button>
  )
}
