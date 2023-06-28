import React from 'react'

interface Props {
  emoji: string
  ariaLabel: string
  className?: string
}

export default ({ emoji, ariaLabel, className, ...props }: Props) => (
  <span
    role="img"
    aria-label={ariaLabel}
    className={`flex-none ${className}`}
    {...props}
  >
    {emoji}
  </span>
)
