'use client'

import { useGetUserProfile } from '@/api/usecases/use-get-user-profile'
import { Avatar } from '@/components/avatar'
import { ProfileCard } from '@/components/card/profile-card'
import { SearchInput } from '@/components/search-input'
import { BookOpen, Books, CaretLeft, UserList } from '@phosphor-icons/react'
import { getYear } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'

export default function Profile({ params }: { params: { id: string } }) {
  const [search, setSearch] = useState('')

  const session = useSession()
  const route = useRouter()

  const id = params.id || session.data?.user?.id

  const { data } = useGetUserProfile(id!)

  const filteredData = useMemo(() => {
    if (data && search) {
      return {
        ...data,
        ratings: data.ratings.filter((rating) =>
          rating.book.name.toLowerCase().includes(search.toLowerCase()),
        ),
      }
    } else {
      return data
    }
  }, [data, search])

  if (filteredData) {
    return (
      <section className="grid grid-cols-[1fr_auto] pt-10">
        <div className="pr-16">
          <button
            className="flex flex-row items-center gap-2 p-2 pb-10"
            onClick={route.back}
          >
            <CaretLeft size={20} />
            <h4 className="text-gray-200">Voltar</h4>
          </button>
          <SearchInput
            placeholder="Buscar livro avaliado"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="grid pb-6">
            {filteredData.ratings.map((rating) => (
              <ProfileCard
                key={rating.id}
                date={rating.created_at}
                book={{
                  author: rating.book.author,
                  cover_url: rating.book.cover_url,
                  name: rating.book.name,
                }}
                rating={rating.rate}
                opinion={rating.description}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center self-baseline border-l border-gray-700 px-14">
          <Avatar avatarUri={filteredData.avatar_url ?? ''} size={72} />
          <h2 className="mt-6">{filteredData.name}</h2>
          <p className="pt-2 text-gray-400">
            Membro desde {getYear(filteredData.created_at)}
          </p>

          <div className="my-8 h-2 w-8 rounded-full bg-gradient-to-r from-[#7FD1CC] to-[#9694F5]" />

          <div className="space-y-4">
            <div className="flex flex-row items-center gap-5">
              <BookOpen size={32} className="fill-green-100" />
              <span>
                <h4 className="text-gray-200">{filteredData.readPages}</h4>
                <p className=" text-gray-300">Páginas lidas</p>
              </span>
            </div>

            <div className="flex flex-row items-center gap-5">
              <Books size={32} className="fill-green-100" />
              <span>
                <h4 className=" text-gray-200 ">{filteredData.ratedBooks}</h4>
                <p className="text-gray-300">Livros avaliados</p>
              </span>
            </div>

            <div className="flex flex-row items-center gap-5">
              <UserList size={32} className="fill-green-100" />
              <span>
                <h4 className=" text-gray-200 ">{filteredData.authors}</h4>
                <p className="text-gray-300">Autores lidos</p>
              </span>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
