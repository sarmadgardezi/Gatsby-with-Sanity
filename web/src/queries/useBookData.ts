import { useStaticQuery, graphql } from 'gatsby'

import { GatsbyImageFixedWithWebp } from '../types'
import { BookNode } from '../../plugins/gatsby-source-itunes/gatsby-node'

export interface Book extends BookNode {
  image: GatsbyImageFixedWithWebp
}

export default (): Array<Book> =>
  useStaticQuery(
    graphql`
      {
        allBook(sort: { fields: date, order: DESC }) {
          nodes {
            date(formatString: "YYYY")
            image {
              childImageSharp {
                fixed(width: 200, height: 300, quality: 80) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
            id
            link
            title
          }
        }
      }
    `,
  ).allBook.nodes
