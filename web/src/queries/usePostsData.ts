import { useStaticQuery, graphql } from 'gatsby'

interface PostNode {
  node: {
    id: string
  }
}

export default (): any =>
  useStaticQuery(
    graphql`
      {
        allMarkdownRemark(
          filter: { frontmatter: { published: { eq: true } } }
          sort: { fields: frontmatter___datePublished, order: DESC }
        ) {
          nodes {
            frontmatter {
              datePublished(formatString: "MMM D, YYYY")
              dateUpdated(formatString: "MMM D, YYYY")
              description
              devLink
              linkSharedOnTwitter
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 1000, quality: 80) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              published
              slug
              title
              topics
            }
            html
            id
          }
        }
      }
    `,
  ).allMarkdownRemark.nodes
