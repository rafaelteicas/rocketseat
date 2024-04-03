'use client'

import { Avatar } from '@/components/avatar'
import { ProfileCard } from '@/components/card/profile-card'
import { SearchInput } from '@/components/search-input'
import { Text } from '@/components/text'
import { BookOpen, CaretLeft } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Profile() {
  const session = useSession()
  const route = useRouter()

  if (session.data) {
    return (
      <section className="pt-10 grid grid-cols-[1fr_auto]">
        <div className="pr-16">
          <button
            className="flex flex-row items-center gap-2 p-2 pb-10"
            onClick={route.back}
          >
            <CaretLeft size={20} />
            <Text preset="buttonMedium" className="text-gray-200">
              Voltar
            </Text>
          </button>
          <SearchInput placeholder="Buscar livro avaliado" />
          <div className="grid pt-10">
            <ProfileCard
              date="2024-04-01T21:55:01.568Z"
              book={{
                author: 'J.R.R. Tolkien',
                cover_url: 'images/books/o-hobbit.png',
                name: 'O Hobbit',
              }}
              rating={10}
              opinion="Lorem Ipsum dolor sit amet, consectetur adipiscing elit"
            />
          </div>
        </div>
        <div className="flex flex-col items-center flex-1 border-l border-gray-700 px-14 self-baseline">
          <Avatar avatarUri={session.data.user?.image ?? ''} size={72} />
          <Text preset="headingMedium" className="mt-6">
            {session.data.user?.name}
          </Text>
          <Text preset="textSmall" className="text-gray-400 pt-2">
            membro desde 2019
          </Text>

          <div className="rounded-full w-8 h-2 bg-gradient-to-r from-[#7FD1CC] to-[#9694F5] my-8" />

          <div className="flex flex-row gap-5">
            <BookOpen size={32} className="fill-green-100" />
            <div>
              <Text preset="headingExtraSmall" className="text-gray-200">
                853
              </Text>
              <Text preset="textSmall" className="text-gray-300 pb-4 pt-2">
                Páginas lidas
              </Text>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
