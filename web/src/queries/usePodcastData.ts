import { useStaticQuery, graphql } from 'gatsby'

import { GatsbyImageFixedWithWebp } from '../types'
import { PodcastNode } from '../../plugins/gatsby-source-itunes/gatsby-node'

export interface Podcast extends PodcastNode {
  image: GatsbyImageFixedWithWebp
}

export default (): Array<Podcast> =>
  useStaticQuery(
    graphql`
      {
        allPodcast(sort: { fields: date, order: DESC }) {
          nodes {
            artist
            date(formatString: "YYYY")
            id
            image {
              childImageSharp {
                fixed(width: 200, height: 200, quality: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            link
            title
          }
        }
      }
    `,
  ).allPodcast.nodes
