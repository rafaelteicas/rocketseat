import React from 'react'
import Image from 'next/image'
import { Text } from '@/components/text'

interface Props {
  onClick: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: string | any
  title: string
}

export function AuthButton({ src, title, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-600 flex flex-row items-center py-5 px-6 rounded-lg gap-5 max-h-[72px] w-[372px] hover:bg-gray-700"
    >
      <Image src={src} width={34} height={34} alt={title} />
      <Text preset="buttonLarge">{title}</Text>
    </button>
  )
}
