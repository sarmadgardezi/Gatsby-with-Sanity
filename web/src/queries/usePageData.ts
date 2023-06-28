import { useStaticQuery, graphql } from 'gatsby'
import { ReactNode } from 'react'

interface Emoji {
  icon: string
  label: string
}

interface PageHeader {
  headline: ReactNode
  emoji: Emoji
  summary: string
}

interface PageData {
  blogYaml: PageHeader
  likesYaml: PageHeader
  operaYaml: PageHeader
  websitesYaml: PageHeader
}

export default (): PageData =>
  useStaticQuery(
    graphql`
      {
        blogYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }

        websitesYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }

        operaYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }

        likesYaml {
          headline
          emoji {
            icon
            label
          }
          summary
        }
      }
    `,
  )
