import { useStaticQuery, graphql } from 'gatsby'

import { GatsbyImageFixedWithWebp } from '../types'
import { MovieNode } from '../../plugins/gatsby-source-tmdb/gatsby-node'

export interface Movie extends MovieNode {
  image: GatsbyImageFixedWithWebp
}

export default (): Array<Movie> =>
  useStaticQuery(
    graphql`
      {
        allMovie(sort: { fields: date, order: DESC }) {
          nodes {
            date(formatString: "YYYY")
            id
            image {
              childImageSharp {
                fixed(width: 200, height: 300, quality: 80) {
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
  ).allMovie.nodes
