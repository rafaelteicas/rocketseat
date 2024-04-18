import React from 'react'
import Image from 'next/image'

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
      className="flex max-h-[72px] w-[372px] flex-row items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 hover:bg-gray-700"
    >
      <Image src={src} width={34} height={34} alt={title} />
      <h3 className="font-medium">{title}</h3>
    </button>
  )
}
