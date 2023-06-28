import { useStaticQuery, graphql } from 'gatsby'

import { GatsbyImageFixedWithWebp } from '../types'
import { TvShowNode } from '../../plugins/gatsby-source-tmdb/gatsby-node'

export interface TvShow extends TvShowNode {
  image: GatsbyImageFixedWithWebp
}

export default (): Array<TvShow> =>
  useStaticQuery(
    graphql`
      {
        allTvShow(sort: { fields: date, order: DESC }) {
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
  ).allTvShow.nodes
