'use client'

import React, { useState } from 'react'
import { Text } from '@/components/text'
import { Binoculars } from '@phosphor-icons/react'
import { PopularBooksCard } from '@/components/card/popular-books-card'
import { useGetBooks } from '@/api/usecases/use-get-books'
import { useGetCategories } from '@/api/usecases/use-get-categories'
import { useGetBooksByCategory } from '@/api/usecases/use-get-books-by-category'
import { SearchInput } from '@/components/search-input'

export default function Explore() {
  const { categories } = useGetCategories()
  const [selectedFilter, setSelectedFilter] = useState<string>('Todos')

  const { books } = useGetBooks()
  const { booksByCategory } = useGetBooksByCategory(selectedFilter)

  const data = selectedFilter === 'Todos' ? books : booksByCategory

  return (
    <section className="pt-6">
      <div className="flex flex-row justify-between items-center pb-10">
        <Text
          preset="headingLarge"
          className="flex flex-1 flex-row gap-3 leading-none items-center"
        >
          <Binoculars size={32} className="fill-green-100" />
          Explorar
        </Text>
        <SearchInput placeholder="Buscar livro ou autor" />
      </div>
      <div className="flex gap-2 flex-wrap">
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
            <Text
              preset="textMedium"
              className={
                category.name === selectedFilter
                  ? 'text-gray-100'
                  : 'text-purple-100'
              }
            >
              {category.name}
            </Text>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 pt-12 gap-4">
        {data?.map((book) => (
          <PopularBooksCard
            bookId={book.id}
            key={book.id}
            author={book.author}
            image={book.cover_url}
            rate={book.rate}
            title={book.name}
          />
        ))}
      </div>
    </section>
  )
}

const $unselectedFilter = 'px-4 py-2 rounded-full border border-purple-100'
const $selectedFilter = 'px-4 py-2 rounded-full bg-purple-200'
