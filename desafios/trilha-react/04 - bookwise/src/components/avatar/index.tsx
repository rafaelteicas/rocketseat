import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  avatarUri: string
}

export function Avatar({ avatarUri }: AvatarProps) {
  return (
    <div className="bg-gradient-to-bl from-[#7FD1CC] via-[#8CAFE3] to-[#9694F5] p-[2px] rounded-full flex items-center justify-center">
      <Image
        src={avatarUri}
        alt="Avatar"
        width={40}
        height={40}
        className="rounded-full object-none"
        style={{
          width: 40,
          height: 40,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </div>
  )
}
