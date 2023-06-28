import React from 'react'
import { graphql } from 'gatsby'

import { Base, Link, Metadata, Subscribe } from '.'
import { ReactComponent as CalendarSVG } from '../svg/calendar-alt-regular.svg'

export const pageQuery = graphql`
  query($id: String) {
    markdownRemark(id: { eq: $id }) {
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
`

const MetaItem = ({ action, date }: { action: string; date: string }) => (
  <li className="flex items-center mt-2 mr-4 text-lg md:text-xl">
    <span className="flex justify-center items-center mr-1 shadow-md rounded-full purple-gradient w-8 h-8 text-white">
      <CalendarSVG className="icon" aria-hidden />
    </span>
    <p>
      {action} {date}
    </p>
  </li>
)

const MetaItems = ({ post }: any) => (
  <ul className="mt-6 sm:flex sm:flex-wrap sm:mt-3">
    <MetaItem action="Published" date={post.frontmatter.datePublished} />
    {post.frontmatter.dateUpdated && (
      <MetaItem action="Updated" date={post.frontmatter.dateUpdated} />
    )}
  </ul>
)

const Footer = ({ post }: any) => (
  <footer className="mt-16">
    <Link
      href={post.frontmatter.devLink}
      variant="underline"
      className="text-lg iPhoneX:text-xl font-bold"
    >
      Discuss on DEV.to
    </Link>
  </footer>
)

const getPostMetadata = (post: any): any => ({
  author: 'Michael Uloth',
  description: post.frontmatter.description,
  image: post.frontmatter.featuredImage.childImageSharp.fluid.src,
  title: post.frontmatter.title,
  type: 'article',
  url: `https://www.michaeluloth.com/${post.frontmatter.slug}`,
})

export default ({ data: { markdownRemark: post } }: { data: any }) => {
  const metadata = getPostMetadata(post)

  return (
    <Base>
      <Metadata page={metadata} />

      <main className="mt-12 pt-4">
        <article className="max-w-2xl">
          <header className="mb-10">
            <h1 className="text-4xl iPhoneX:text-5xl font-black">
              {post.frontmatter.title}
            </h1>
            <MetaItems post={post} />
          </header>

          <div
            dangerouslySetInnerHTML={{ __html: post.html }}
            className="blog-post"
          />

          {post.frontmatter.devLink && <Footer post={post} />}
        </article>
      </main>

      <Subscribe />
    </Base>
  )
}
