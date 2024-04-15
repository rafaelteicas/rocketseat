'use client'
import React from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchInput({ ...inputProps }: SearchInputProps) {
  return (
    <div className="flex h-12 flex-1 items-center rounded-[4px] border border-gray-500 p-4 ">
      <input
        className="flex-1 bg-[transparent] text-sm text-gray-400 outline-none placeholder:text-sm placeholder:text-gray-400"
        {...inputProps}
      />
      <MagnifyingGlass size={20} className="fill-gray-500" />
    </div>
  )
}
