import React, { ReactNode } from 'react'
import { WindowLocation } from '@reach/router'

import { Bottom, Metadata, Top } from '.'
import avenirRegular from '../fonts/AvenirNextLTPro-Regular.woff2'
import avenirHeavy from '../fonts/AvenirNextLTPro-Heavy.woff2'

interface Props {
  children: ReactNode
  location?: WindowLocation
}

export default ({ children, location }: Props) => (
  <div className="flex flex-col justify-center min-h-screen px-3 sm:px-4 md:px-8 xl:px-12">
    <Metadata
      preload={[
        { href: avenirRegular, as: `font`, type: `font/woff2` },
        { href: avenirHeavy, as: `font`, type: `font/woff2` },
      ]}
    />
    <Top />
    <div className="flex-auto relative">{children}</div>
    <Bottom currentPath={location && location.pathname} />
  </div>
)
