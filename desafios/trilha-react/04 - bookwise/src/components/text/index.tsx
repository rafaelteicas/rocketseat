import React from 'react'

type TextsPresets =
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'headingExtraSmall'
  | 'textLarge'
  | 'textMedium'
  | 'textSmall'
  | 'buttonLarge'
  | 'buttonMedium'
  | 'buttonSmall'

interface Props {
  preset: TextsPresets
  children: React.ReactNode
  className?: string
}

export function Text({ preset, className, children }: Props) {
  const styles = getTextPreset(preset)
  return <p className={`${className} ${styles}`}>{children}</p>
}
function getTextPreset(preset: TextsPresets) {
  switch (preset) {
    case 'headingLarge':
      return 'text-2xl font-bold leading-snug'
    case 'headingMedium':
      return 'text-xl font-bold leading-snug'
    case 'headingSmall':
      return 'text-lg font-bold leading-snug'
    case 'headingExtraSmall':
      return 'text-base font-bold leading-snug'
    case 'textLarge':
      return 'text-xl leading-4	font-medium'
    case 'textMedium':
      return 'text-base leading-4	font-medium'
    case 'textSmall':
      return 'text-sm	leading-relaxed font-regular'
    case 'buttonLarge':
      return 'text-lg	font-medium'
    case 'buttonMedium':
      return 'text-base font-bold font-medium'
    case 'buttonSmall':
      return 'text-sm font-bold font-medium'
    default:
      return ''
  }
}
