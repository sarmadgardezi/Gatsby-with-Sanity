import React from 'react'
import { WindowLocation } from '@reach/router'
// @ts-ignore
import stringReplaceToArray from 'string-replace-to-array'

import { Base, Link, Metadata, PageHeader } from '../ui'
import { usePageData, useSiteMetadata, useWebsitesData } from '../queries'
import { toolLinks, ToolName, WebsiteData } from '../queries/useWebsitesData'

const getToolLink = (tool: ToolName): string =>
  toolLinks[tool] || `https://youtu.be/dQw4w9WgXcQ` // prevent empty links

const Tool = ({ tool }: { tool: ToolName }) => {
  const link = getToolLink(tool)

  return (
    <li className="mt-2 mr-2 lh-normal">
      <Link variant="incognito" href={link} className="link-tag">
        {tool}
      </Link>
    </li>
  )
}

type Description = Pick<WebsiteData, 'description' | 'repo'>

const Description = ({ description, repo }: Description) => {
  let updatedDescription = description

  // If the website has a public repo...
  if (repo) {
    // Wrap the word "GitHub" with a link to the repo
    updatedDescription = stringReplaceToArray(
      description,
      /GitHub/i,
      (match: string, i: number) => (
        <Link variant="underline" href={repo} key={i} className="font-bold">
          {match}
          <span className="sr-only"> (Link opens in a new tab or window.)</span>
        </Link>
      ),
    )
  }

  return <p className="mt-3 text-lg copy iPhoneX:text-xl">{updatedDescription}</p>
}

const Websites = () => {
  const websites = useWebsitesData()

  return (
    <section>
      <h2 className="sr-only">Website projects</h2>

      <ul>
        {websites.map(website => (
          <li key={website.id} className="mt-16">
            <Link variant="underline" href={website.link} className="project-title">
              {website.title}
            </Link>

            <Description description={website.description} repo={website.repo} />

            <ul className="flex flex-wrap">
              {website.tools.map(tool => (
                <Tool key={tool} tool={tool} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ({ location }: { location: WindowLocation }) => {
  const { websitesPage } = useSiteMetadata()
  const { websitesYaml: page } = usePageData()

  return (
    <Base location={location}>
      <Metadata page={websitesPage} />

      <PageHeader
        headline={
          <>
            <span>{page.headline}</span>
            <span className="hidden md:inline">sites</span>
          </>
        }
        emoji={page.emoji}
        summary={page.summary}
      />

      <main className="max-w-2xl">
        <Websites />
      </main>
    </Base>
  )
}
