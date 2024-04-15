'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React from 'react'

export interface NavItemProps {
  name: string
  path: string
  icon: React.ElementType
}

export function NavItem({ icon: Icon, path, name }: NavItemProps) {
  const pathName = usePathname()

  const isActive = pathName === path

  const selectedItem =
    '-ml-6 before:bg-gradient-to-t before:to-[#7FD1CC] before:from-[#9694F5] before:w-1 before:h-6 before:rounded-full before:mr-2'

  return (
    <Link
      href={path || ''}
      className={`group flex flex-row items-center gap-3 ${isActive && selectedItem}`}
    >
      <Icon
        size={24}
        className={`${isActive ? 'fill-gray-100' : 'fill-gray-400'} group-hover:fill-gray-100`}
      />
      <h4
        className={`${isActive ? 'text-gray-100' : 'text-gray-400'} group-hover:text-gray-100`}
      >
        {name}
      </h4>
    </Link>
  )
}
