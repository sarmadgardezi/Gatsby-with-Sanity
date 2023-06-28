import React from 'react'
import Image from 'gatsby-image'

import { Link } from '.'
import { useSharedData } from '../queries'

export default () => {
  const { avatar } = useSharedData()

  return (
    <nav className="flex justify-between pt-4 md:pt-6">
      <Link variant="incognito" href="/">
        <span className="sr-only">Navigate to home page</span>
        <Image
          fluid={{ ...avatar.file.childImageSharp.fluid, aspectRatio: 1 / 1 }}
          alt="Michael Uloth"
          className="shadow rounded-full w-16"
          imgStyle={{ objectPosition: avatar.objPos }}
        />
      </Link>
    </nav>
  )
}
