import React, { ReactNode } from 'react'

import { Emoji } from '.'

interface Emoji {
  icon: string
  label: string
}

interface Props {
  emoji: Emoji
  headline: ReactNode
  summary: string
}

export default ({ headline, emoji, summary }: Props) => (
  <header>
    <h1 className="page-headline">
      {headline} <Emoji emoji={emoji.icon} ariaLabel={emoji.label} />
    </h1>

    <p className="page-summary" dangerouslySetInnerHTML={{ __html: summary }} />
  </header>
)
