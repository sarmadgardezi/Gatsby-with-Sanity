import React from 'react'
import { WindowLocation } from '@reach/router'

import { Base, Link, Metadata, PageHeader } from '../ui'
import { usePageData, usePostsData, useSiteMetadata } from '../queries'

const Topics = ({ topics }: { topics: Array<string> }) => (
  <ul className="flex flex-wrap">
    {topics.map(topic => (
      <li key={topic} className="mt-2 mr-2 lh-normal">
        <span className="link-tag">{topic}</span>
      </li>
    ))}
  </ul>
)

const Posts = () => {
  const posts = usePostsData()

  return (
    <section>
      <h2 className="sr-only">Blog posts</h2>

      <ul>
        {posts.map((post: any) => (
          <li key={post.id} className="mt-16">
            <Link
              variant="underline"
              href={`/${post.frontmatter.slug}/`}
              className="project-title"
            >
              {post.frontmatter.title}
            </Link>

            <p
              dangerouslySetInnerHTML={{ __html: post.frontmatter.description }}
              className="mt-3 copy text-lg iPhoneX:text-xl"
            />

            {post.frontmatter.topics && <Topics topics={post.frontmatter.topics} />}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ({ location }: { location: WindowLocation }) => {
  const { blogPage } = useSiteMetadata()
  const { blogYaml: page } = usePageData()

  return (
    <Base location={location}>
      <Metadata page={blogPage} />

      <PageHeader
        headline={page.headline}
        emoji={page.emoji}
        summary={page.summary}
      />

      <main className="max-w-2xl">
        <Posts />
      </main>
    </Base>
  )
}
