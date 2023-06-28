import { useStaticQuery, graphql } from 'gatsby'

import { Platform } from '../ui/Bottom'
import { GatsbyImageFluidWithWebp } from '../types'

interface Avatar {
  file: GatsbyImageFluidWithWebp
  objPos: string
}

export interface NavLink {
  href: string
  text: string
}

export interface SocialLink {
  href: string
  platform: Platform
  srText: string
}

interface SharedData {
  avatar: Avatar
  navLinks: NavLink[]
  socialLinks: SocialLink[]
}

export default (): SharedData =>
  useStaticQuery(
    graphql`
      {
        sharedYaml {
          avatar {
            file {
              childImageSharp {
                fluid(maxWidth: 60, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            objPos
          }

          navLinks {
            href
            text
          }

          socialLinks {
            platform
            href
            srText
          }
        }
      }
    `,
  ).sharedYaml
