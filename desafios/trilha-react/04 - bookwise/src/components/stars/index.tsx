'use client'

import { Star, StarHalf } from '@phosphor-icons/react'
import React from 'react'

interface Props {
  rating: number
  className?: string
}

export function Stars({ rating, className }: Props) {
  if (!rating) {
    return null
  }

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
    <div className={`flex flex-row ${className}`}>
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
