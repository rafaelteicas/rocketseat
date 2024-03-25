import { Text } from '@/components/text'
import Image from 'next/image'
import React from 'react'
import livro from '../../../assets/livro.jpeg'
import { Avatar } from '@/components/avatar'
import { Stars } from '@/components/stars'

export function ReviewCard() {
  return (
    <div className="bg-gray-700 p-6 rounded-lg ">
      <header className="pb-7 flex flex-row gap-4">
        <Avatar />
        <div className="flex items-baseline flex-col flex-1">
          <Text preset="textMedium" className="mb-2">
            John Doe
          </Text>
          <Text preset="textSmall" className="text-gray-400">
            Hoje
          </Text>
        </div>
        <Stars rating={500000} />
      </header>
      <div>
        <div className="flex flex-row gap-5">
          <Image
            width={108}
            height={152}
            src={livro}
            alt=""
            className="rounded"
          />
          <div className="flex flex-col">
            <Text preset="headingExtraSmall" className="mb-2">
              O Hobbit
            </Text>
            <Text preset="textSmall" className="text-gray-400">
              J.R.R. Tolkien
            </Text>
            <Text preset="textSmall" className="text-gray-300 mt-auto">
              Semper et sapien proin vitae nisi. Feugiat neque integer donec et
              aenean posuere amet ultrices. Cras fermentum id pulvinar varius
              leo a in. Amet libero pharetra nunc elementum fringilla velit
              ipsum. Sed vulputate massa velit nibh... ver mais
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
