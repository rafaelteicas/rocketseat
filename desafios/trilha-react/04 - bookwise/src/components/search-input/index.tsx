'use client'
import React from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'

interface SearchInputProps {
  placeholder: string
}

export function SearchInput({ placeholder }: SearchInputProps) {
  return (
    <div className="border border-gray-500 flex flex-1 h-12 rounded-[4px] items-center p-4 ">
      <input
        className="bg-[transparent] flex-1 outline-none text-sm text-gray-400 placeholder:text-sm placeholder:text-gray-400"
        placeholder={placeholder}
      />
      <MagnifyingGlass size={20} className="fill-gray-500" />
    </div>
  )
}
