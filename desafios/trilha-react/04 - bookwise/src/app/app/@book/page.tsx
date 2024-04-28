'use client'

import { X } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import React, { useContext, useState } from 'react'

import { SidePanelContext } from '@/service/side-panel/side-panel-context'

import { BookCard } from './components/book-card'
import { Rate } from './components/rate'
import { RatingsCard } from './components/ratings-card'

export default function Book() {
  const [rateBook, setRateBook] = useState(false)
  const { bookId, hideSidePanel } = useContext(SidePanelContext)

  const session = useSession()

  function handleRateBook() {
    setRateBook((curr) => !curr)
  }

  if (!bookId) {
    return null
  }

  return (
    <div className="fixed inset-0 z-10">
      <div className="fixed right-0 h-screen w-[40%] overflow-y-scroll bg-gray-800 px-12  py-16">
        <button
          className="flex w-full flex-row justify-end pb-4"
          onClick={hideSidePanel}
        >
          <X size={24} className="fill-gray-400" />
        </button>
        <BookCard bookId={bookId} />
        <div className="flex flex-row justify-between pb-4 pt-10">
          <p>Avaliações</p>
          {session.data && (
            <button onClick={handleRateBook}>
              <p className="cursor-pointer text-purple-100">Avaliar</p>
            </button>
          )}
        </div>
        {rateBook && <Rate bookId={bookId} />}
        <RatingsCard bookId={bookId} />
      </div>

      <div
        className="fixed inset-0 -z-10 h-screen w-screen bg-[#000] opacity-70"
        onClick={hideSidePanel}
      />
    </div>
  )
}
