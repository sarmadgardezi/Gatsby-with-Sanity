import React from 'react'
import Image from 'gatsby-image'
import { WindowLocation } from '@reach/router'

import { Base, Link, Metadata, PageHeader } from '../ui'
import { usePageData, useSiteMetadata } from '../queries'
import useAlbumData, { Album } from '../queries/useAlbumData'
import useBookData, { Book } from '../queries/useBookData'
import useMovieData, { Movie } from '../queries/useMovieData'
import usePodcastData, { Podcast } from '../queries/usePodcastData'
import useTvShowData, { TvShow } from '../queries/useTvShowData'

interface Likes {
  heading: string
  items: Array<TvShow | Movie | Book | Album | Podcast>
  info: string
}

const isMissingCriticalData = (
  item: TvShow | Movie | Book | Album | Podcast,
): boolean =>
  !item ||
  !item.title ||
  !item.image ||
  !item.image.childImageSharp ||
  !item.image.childImageSharp.fixed

const Likes = ({ heading, items, info }: Likes) => (
  <section className="mt-16">
    <h2 className=" text-5xl iPhoneX:text-6xl font-black">{heading}</h2>

    <ul className="flex relative mt-3 overflow-x-auto overflow-y-hidden hide-scrollbar scrolling-touch">
      {items.map(item =>
        isMissingCriticalData(item) ? (
          <></>
        ) : (
          <li key={item.id} className="flex-none mr-10 w-48">
            <Link
              variant="incognito"
              href={item.link || 'https://youtu.be/dQw4w9WgXcQ'}
              srText={`Visit the ${info} page for "${item.title}" in a new window.`}
            >
              <Image
                fixed={item.image.childImageSharp.fixed}
                alt="" // decorative, so hide from screen readers
                className="shadow-lg rounded"
              />

              <p className="mt-2 text-center text-xl font-bold">{item.title}</p>

              {'artist' in item && item.artist && (
                <p className="mt-1 text-center font-bold">{item.artist}</p>
              )}

              {item.date && (
                <p className="mt-1 text-center font-bold">({item.date})</p>
              )}
            </Link>
          </li>
        ),
      )}
    </ul>
  </section>
)

export default ({ location }: { location: WindowLocation }) => {
  const { likesPage } = useSiteMetadata()
  const { likesYaml: page } = usePageData()

  const tvShows = useTvShowData()
  const movies = useMovieData()
  const books = useBookData()
  const albums = useAlbumData()
  const podcasts = usePodcastData()

  return (
    <Base location={location}>
      <Metadata page={likesPage} />

      <PageHeader
        headline={page.headline}
        emoji={page.emoji}
        summary={page.summary}
      />

      <main>
        <Likes heading="TV" items={tvShows} info="TMDB" />
        <Likes heading="Movies" items={movies} info="TMDB" />
        <Likes heading="Books" items={books} info="Apple Books" />
        <Likes heading="Albums" items={albums} info="Apple Music" />
        <Likes heading="Podcasts" items={podcasts} info="Apple Podcasts" />
      </main>
    </Base>
  )
}
