import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  avatarUri: string
  size?: number
}

export function Avatar({ avatarUri, size = 40 }: AvatarProps) {
  return (
    <div
      className="bg-gradient-to-bl from-[#7FD1CC] via-[#8CAFE3] to-[#9694F5] p-[2px] rounded-full flex items-center justify-center"
      style={{
        maxHeight: size + 2,
        maxWidth: size + 2,
      }}
    >
      <Image
        src={avatarUri}
        alt="Avatar"
        width={size}
        height={size}
        className="rounded-full object-none"
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </div>
  )
}
