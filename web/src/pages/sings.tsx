import React from 'react'
import { WindowLocation } from '@reach/router'

import { Base, Link, Metadata, PageHeader } from '../ui'
import { useGigsData, usePageData, useSiteMetadata } from '../queries'
import { Tag as TagType, tagLinks } from '../queries/useGigsData'

const getTagLink = (tag: TagType): string =>
  tagLinks[tag] || 'https://youtu.be/dQw4w9WgXcQ' // prevent empty links

const Tag = ({ tag }: { tag: TagType }) => (
  <li className="mt-2 mr-2 lh-normal">
    <Link variant="incognito" href={getTagLink(tag)} className="link-tag">
      {tag}
      <span className="sr-only"> (Link opens in a new tab or window.)</span>
    </Link>
  </li>
)

const Tags = ({ tags }: any) => (
  <ul className="flex flex-wrap">
    {tags.map((tag: any) => (
      <Tag key={tag} tag={tag} />
    ))}
  </ul>
)

const Gigs = () => {
  const gigs = useGigsData()

  return (
    <section>
      <h2 className="sr-only">Opera and concert performances</h2>

      <ul>
        {gigs.map(gig => (
          <li key={gig.id} className="mt-16">
            <Link
              variant="underline"
              href={gig.link}
              lang={gig.title.lang}
              className="project-title"
            >
              {gig.title.text}
            </Link>

            <p
              dangerouslySetInnerHTML={{ __html: gig.description }}
              className="mt-3 copy text-lg iPhoneX:text-xl"
            />

            {gig.tags && <Tags tags={gig.tags} />}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ({ location }: { location: WindowLocation }) => {
  const { operaPage } = useSiteMetadata()
  const { operaYaml: page } = usePageData()

  return (
    <Base location={location}>
      <Metadata page={operaPage} />

      <PageHeader
        headline={page.headline}
        emoji={page.emoji}
        summary={page.summary}
      />

      <main className="max-w-2xl">
        <Gigs />
      </main>
    </Base>
  )
}
