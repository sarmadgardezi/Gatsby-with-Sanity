import { CreatePagesArgs } from 'gatsby'

interface MarkdownQueryNode {
  frontmatter: {
    slug: string
  }
  id: string
}

interface MarkdownQueryResult {
  data?: {
    allMarkdownRemark: {
      nodes: Array<MarkdownQueryNode>
    }
  }
  errors?: string
}

export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const mdQuery: MarkdownQueryResult = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { published: { eq: true } } }) {
        nodes {
          frontmatter {
            slug
          }
          id
        }
      }
    }
  `)

  if (mdQuery.errors) {
    // Don't create pages with incomplete data
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`[createPages]: ${mdQuery.errors}`)
    } else {
      console.error(`[createPages]: ${mdQuery.errors}`)
    }
  }

  if (
    !mdQuery.data ||
    !mdQuery.data.allMarkdownRemark ||
    !mdQuery.data.allMarkdownRemark.nodes ||
    !mdQuery.data.allMarkdownRemark.nodes.length
  ) {
    // Don't create pages with no data
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[createPages]: No markdown query results')
    } else {
      console.error('[createPages]: No markdown query results')
    }

    return
  }

  const { nodes } = mdQuery.data.allMarkdownRemark

  nodes.forEach((node: MarkdownQueryNode) => {
    // const prev: any | null = i === 0 ? null : edges[i - 1].node
    // const next: any | null = i === edges.length - 1 ? null : edges[i + 1].node

    actions.createPage({
      path: node.frontmatter.slug,
      component: require.resolve(`../ui/Post.tsx`),
      context: {
        id: node.id,
        // prev,
        // next,
      },
    })
  })
}
