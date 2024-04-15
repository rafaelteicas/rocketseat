'use client'

import React, { useMemo, useState } from 'react'
import { Binoculars } from '@phosphor-icons/react'
import { PopularBooksCard } from '@/components/card/popular-books-card'
import { useGetBooks } from '@/api/usecases/use-get-books'
import { useGetCategories } from '@/api/usecases/use-get-categories'
import { useGetBooksByCategory } from '@/api/usecases/use-get-books-by-category'
import { SearchInput } from '@/components/search-input'
import { useSession } from 'next-auth/react'

export default function Explore() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos')
  const [search, setSearch] = useState('')

  const session = useSession()
  const { categories } = useGetCategories()
  const userId = session.data?.user?.id
  const { books, isLoading } = useGetBooks(userId)
  const { booksByCategory } = useGetBooksByCategory(selectedFilter, userId)

  const data = useMemo(() => {
    if (search && books) {
      return books.filter((book) => {
        return book.name.toLowerCase().includes(search.toLowerCase())
      })
    }
    if (selectedFilter !== 'Todos') {
      return booksByCategory
    }
    if (books) {
      return books
    }
  }, [search, books, selectedFilter, booksByCategory])

  if (isLoading) {
    return <h1>Carregando</h1>
  }

  return (
    <section className="pt-6">
      <div className="flex flex-row items-center justify-between pb-10">
        <h1 className="flex flex-1 flex-row items-center gap-3 leading-none">
          <Binoculars size={32} className="fill-green-100" />
          Explorar
        </h1>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar livro ou autor"
        />
      </div>

      <>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              className={
                category.name === selectedFilter
                  ? $selectedFilter
                  : $unselectedFilter
              }
              key={category.id}
              onClick={() => setSelectedFilter(category.name)}
            >
              <p
                className={
                  'text-base font-medium' + category.name === selectedFilter
                    ? 'text-gray-100'
                    : 'text-purple-100'
                }
              >
                {category.name}
              </p>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 pt-12">
          {data?.map((book) => (
            <PopularBooksCard
              bookId={book.id}
              key={book.id}
              author={book.author}
              image={book.cover_url}
              rate={book.media}
              title={book.name}
              alreadyRated={book.rated}
            />
          ))}
        </div>
      </>
    </section>
  )
}

const $unselectedFilter = 'px-4 py-2 rounded-full border border-purple-100'
const $selectedFilter = 'px-4 py-2 rounded-full bg-purple-200'
