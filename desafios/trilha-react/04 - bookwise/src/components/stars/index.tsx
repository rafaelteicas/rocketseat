'use client'
import { Star, StarHalf } from '@phosphor-icons/react'
import React from 'react'

import { cn } from '@/utils/cn'

interface Props {
  rating: number
  className?: string
}

export function Stars({ rating = 1, className }: Props) {
  if (rating > 5) {
    rating = 5
  }

  const fillStars = Math.floor(rating)
  let emptyStarsLength = 5 - fillStars
  const starts = Array.from(Array(fillStars).keys())
  const halfStar = (fillStars - rating) * -1
  if (halfStar !== 0) {
    emptyStarsLength -= 1
  }
  const emptyStars = Array.from(Array(emptyStarsLength).keys())

  return (
    <div className={cn('flex flex-row', className)}>
      {starts.map((star) => (
        <Star weight="fill" size={16} key={star} className="fill-purple-100" />
      ))}
      {halfStar !== 0 && <StarHalf weight="fill" className="fill-purple-100" />}
      {emptyStars &&
        emptyStars.map((star) => (
          <Star key={star} size={16} className="fill-purple-100" />
        ))}
    </div>
  )
}
