'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavProps } from '.'
import { Binoculars, ChartLineUp } from '@phosphor-icons/react'
import { Text } from '../../components/text'

export function MenuLink({ icon, path, name }: NavProps) {
  const pathName = usePathname()

  const isActive = pathName === path

  const selectedItem =
    '-ml-6 before:bg-gradient-to-t before:to-[#7FD1CC] before:from-[#9694F5] before:w-1 before:h-6 before:rounded-full before:mr-2'

  const Icon = icons[icon]

  return (
    <Link
      href={path}
      className={`group flex flex-row items-center gap-3 ${isActive && selectedItem}`}
    >
      <Icon
        size={24}
        className={`${isActive ? 'fill-gray-100' : 'fill-gray-400'} group-hover:fill-gray-100`}
      />
      <Text
        preset="buttonMedium"
        className={`${isActive ? 'text-gray-100' : 'text-gray-400'} group-hover:text-gray-100`}
      >
        {name}
      </Text>
    </Link>
  )
}

const icons = {
  chartLineUp: ChartLineUp,
  binoculars: Binoculars,
}
