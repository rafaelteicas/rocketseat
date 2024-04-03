'use client'

import React, { useContext, useState } from 'react'
import { BookCard } from './components/book-card'
import { Text } from '@/components/text'
import { SidePanelContext } from '@/service/side-panel/side-panel-context'
import { X } from '@phosphor-icons/react'
import { RatingsCard } from './components/ratings-card'
import { Rate } from './components/rate'

export default function Book() {
  const [rateBook, setRateBook] = useState(false)
  const { bookId, hideSidePanel } = useContext(SidePanelContext)

  function handleRateBook() {
    setRateBook((curr) => !curr)
  }

  if (!bookId) {
    return null
  }

  return (
    <div className="fixed inset-0">
      <div className="fixed h-screen right-0 bg-gray-800 px-12 py-16 w-[40%]  overflow-y-scroll">
        <button
          className="flex w-full flex-row justify-end pb-4"
          onClick={hideSidePanel}
        >
          <X size={24} className="fill-gray-400" />
        </button>
        <BookCard bookId={bookId} />
        <div className="pt-10 flex flex-row justify-between pb-4">
          <Text preset="textSmall">Avaliações</Text>
          <button onClick={handleRateBook}>
            <Text preset="textSmall">Avaliar</Text>
          </button>
        </div>
        {rateBook && <Rate bookId={bookId} />}
        <RatingsCard bookId={bookId} />
      </div>

      <div
        className="fixed inset-0 bg-[#000] w-screen h-screen opacity-70 -z-10"
        onClick={hideSidePanel}
      />
    </div>
  )
}
