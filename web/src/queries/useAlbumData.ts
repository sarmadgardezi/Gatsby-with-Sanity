import { useStaticQuery, graphql } from 'gatsby'

import { GatsbyImageFixedWithWebp } from '../types'
import { AlbumNode } from '../../plugins/gatsby-source-itunes/gatsby-node'

export interface Album extends AlbumNode {
  image: GatsbyImageFixedWithWebp
}

export default (): Array<Album> =>
  useStaticQuery(
    graphql`
      {
        allAlbum(sort: { fields: date, order: DESC }) {
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
  ).allAlbum.nodes
