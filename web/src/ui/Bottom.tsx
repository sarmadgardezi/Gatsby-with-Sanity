import React from 'react'

import { Link } from '.'
import { ReactComponent as TwitterSVG } from '../svg/twitter-brands.svg'
import { ReactComponent as GitHubSVG } from '../svg/github-brands.svg'
import { ReactComponent as LinkedInSVG } from '../svg/linkedin-in-brands.svg'
import { ReactComponent as YouTubeSVG } from '../svg/youtube-brands.svg'
import { ReactComponent as RssSVG } from '../svg/rss-solid.svg'
import { ReactComponent as PaperPlaneSVG } from '../svg/paper-plane-solid.svg'
import { useSharedData } from '../queries'
import {
  NavLink as NavLinkType,
  SocialLink as SocialLinkType,
} from '../queries/useSharedData'

const icons = {
  LinkedIn: <LinkedInSVG className="icon" />,
  Twitter: <TwitterSVG className="icon" />,
  GitHub: <GitHubSVG className="icon" />,
  YouTube: <YouTubeSVG className="icon" />,
  RSS: <RssSVG className="icon" />,
  Email: <PaperPlaneSVG className="icon" />,
}

export type Platform = keyof typeof icons

const getIcon = (platform: Platform): any => icons[platform]

const SocialLink = ({ link }: { link: SocialLinkType }) => (
  <Link variant="icon" href={link.href} className="p-1 iPhoneX:p-2">
    <span className="sr-only">{link.srText}</span>
    {getIcon(link.platform)}
  </Link>
)

const NavLink = ({ link }: { link: NavLinkType }) => (
  <Link
    variant="underline"
    href={link.href}
    className="uppercase text-md lg:text-lg font-bold"
  >
    {link.text}
  </Link>
)

const NavLinks = ({ currentPath }: { currentPath?: string }) => {
  const { navLinks } = useSharedData()

  return (
    <nav className="hidden md:block transform -translate-y-1">
      <ul className="flex">
        {navLinks.map(
          link =>
            currentPath !== link.href &&
            currentPath !== `/` && (
              <li key={link.href} className="ml-5">
                <NavLink link={link}></NavLink>
              </li>
            ),
        )}
      </ul>
    </nav>
  )
}

export default ({ currentPath }: { currentPath?: string }) => {
  const { socialLinks } = useSharedData()

  return (
    <footer className="flex justify-between items-baseline mt-16 pb-3 iPhoneX:pb-2 md:pb-4">
      <ul className="flex-auto flex pt-3">
        {socialLinks.map(link => (
          <li
            key={link.href}
            className="mr-2 iPhoneX:mr-1 text-xl iPhoneX:text-2xl"
          >
            <SocialLink link={link} />
          </li>
        ))}
      </ul>

      <NavLinks currentPath={currentPath} />
    </footer>
  )
}
