import React from 'react'
import { WindowLocation } from '@reach/router'

import { Base, Emoji, Link } from '../ui'
import { useSharedData } from '../queries'
import { NavLink as NavLinkType } from '../queries/useSharedData'

const NavLink = ({ link }: { link: NavLinkType }) => (
  <Link
    variant="underline"
    href={link.href}
    className="text-3xl font-black leading-none uppercase iPhoneX:text-4xl"
  >
    {link.text}
  </Link>
)

const NavLinks = ({ links }: { links: Array<NavLinkType> }) => (
  <nav className="mt-16 iPhoneX:mt-16">
    <ul>
      {links.map(
        link =>
          link.href !== `/` && (
            <li key={link.href} className="mt-5 ">
              <NavLink link={link} />
            </li>
          ),
      )}
    </ul>
  </nav>
)

export default ({ location }: { location: WindowLocation }) => {
  const { navLinks } = useSharedData()

  return (
    <Base location={location}>
      <header>
        <p className="page-headline">
          Hi <Emoji emoji="👋" ariaLabel="Emoji of a hand waving hello." />
        </p>

        <h1 className="text-5xl font-black leading-none tracking-tight whitespace-no-wrap md:text-6xl">
          I'm Michael<span className="sr-only"> Uloth</span>.
        </h1>

        <p className="max-w-md mt-6 text-2xl leading-snug iPhoneX:mt-8">
          I'm a web developer and opera singer working for{' '}
          <Link
            variant="underline"
            href="https://www.ecobee.com"
            className="font-bold"
          >
            ecobee
          </Link>{' '}
          in&nbsp;Toronto.
        </p>
      </header>

      <main>
        <NavLinks links={navLinks} />
      </main>
    </Base>
  )
}
