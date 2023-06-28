import fetch from 'node-fetch'

import { Actions, SourceNodesArgs } from 'gatsby'
import crypto from 'crypto'
import shortid from 'shortid'

const {
  LIKES_CONTENT,
  TMDB_READ_ACCESS_TOKEN,
  TMDB_TV_LIST_ID,
  TMDB_MOVIE_LIST_ID,
} = process.env

// Avoid numbers to prevent clashes with numeric DEV.to article IDs
shortid.characters(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_-',
)

const createTvShowNode = (
  createNode: Actions['createNode'],
  show: TvShowNode,
): void =>
  createNode({
    // Data for the node.
    title: show.title,
    date: show.date,
    link: show.link,
    imageUrl: show.imageUrl,

    // Required fields.
    id: shortid.generate(),
    parent: undefined,
    children: [],
    internal: {
      type: `TvShow`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(show))
        .digest(`hex`),
    },
  })

const createMovieNode = (
  createNode: Actions['createNode'],
  movie: MovieNode,
): void =>
  createNode({
    // Data for the node.
    title: movie.title,
    date: movie.date,
    link: movie.link,
    imageUrl: movie.imageUrl,

    // Required fields.
    id: shortid.generate(),
    parent: undefined,
    children: [],
    internal: {
      type: `Movie`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(movie))
        .digest(`hex`),
    },
  })

interface LikesNode {
  id: string
  link: string
  date: string
}

export interface TvShowNode extends LikesNode {
  imageUrl: string
  title: string
}

export interface MovieNode extends LikesNode {
  imageUrl: string
  title: string
}

const dummyNode: LikesNode = {
  id: 'GENERATE ME EACH TIME',
  link: 'https://www.google.ca',
  date: '2020-01-01',
}

const dummyTvShowNode: TvShowNode = {
  ...dummyNode,
  imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  title: 'Title',
}

const dummyMovieNode: MovieNode = {
  ...dummyNode,
  imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  title: 'Title',
}

const createDummyNodes = (createNode: Actions['createNode']): void => {
  Array.from(Array(10).keys()).forEach(() => {
    createTvShowNode(createNode, { ...dummyTvShowNode, id: shortid.generate() })
    createMovieNode(createNode, { ...dummyMovieNode, id: shortid.generate() })
  })
}

const createTMDBNodes = async (
  tvData: Array<TvShowNode>,
  movieData: Array<MovieNode>,
  createNode: Actions['createNode'],
) => {
  // Don't waste time fetching + optimizing images in development
  if (LIKES_CONTENT === 'dummy') {
    createDummyNodes(createNode)
    return
  }

  // In production, fetch + process all Likes data
  for (let show of tvData) {
    createTvShowNode(createNode, show)
  }

  for (let movie of movieData) {
    createMovieNode(createNode, movie)
  }
}

interface FormattedResult {
  id: string
  imageUrl: string
  date: string
  link: string
  title: string
}

const fetchTMDBListData = async (
  listId: string | undefined,
  api: 'tv' | 'movie',
): Promise<FormattedResult[]> => {
  if (!listId) {
    console.log('fetchTMDBListData error: listId is undefined')
    return []
  }

  let items = []
  let page = 1
  let totalPages = 999 // will be updated after the first API response

  // FIXME: specify variable and return types from here down...
  const fetch20Items = async () =>
    await fetch(
      // See: https://www.themoviedb.org/talk/55aa2a76c3a3682d63002fb1?language=en
      // See: https://developers.themoviedb.org/4/list/get-list
      `https://api.themoviedb.org/4/list/${listId}?sort_by=primary_release_date.desc&page=${page}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
        },
      },
    )

  do {
    try {
      const response = await fetch20Items()
      const data = await response.json()
      totalPages = data.total_pages

      if (data.results && data.results.length > 0) {
        for (let result of data.results) {
          const title = result.title || result.name
          const id = result.id
          const date = result.release_date || result.first_air_date
          const imageUrl = `https://image.tmdb.org/t/p/original${result.poster_path}`
          const link = `https://www.themoviedb.org/${api}/${id}`

          if (!title || !id || !date || !result.poster_path) {
            console.log(`Removed TMDB result:`, title || result)
            continue
          }

          items.push({ title, id, date, imageUrl, link })
        }
      }
    } catch (error) {
      console.log('fetchTMDBListData error', error)
    }

    page++
  } while (page <= totalPages)

  return await Promise.all(items)
}

exports.sourceNodes = async ({ actions }: SourceNodesArgs) => {
  const { createNode } = actions

  let tvData: any = []
  let movieData: any = []

  if (LIKES_CONTENT === 'actual') {
    tvData = await fetchTMDBListData(TMDB_TV_LIST_ID, 'tv')
    movieData = await fetchTMDBListData(TMDB_MOVIE_LIST_ID, 'movie')
    await Promise.all([tvData, movieData])
  }

  createTMDBNodes(tvData, movieData, createNode)
}
