import fetch from 'node-fetch'

import { albums } from '../../content/likes/albums'
import { podcasts } from '../../content/likes/podcasts'
import { books } from '../../content/likes/books'

import { Actions, SourceNodesArgs } from 'gatsby'
import crypto from 'crypto'
import shortid from 'shortid'

const { LIKES_CONTENT } = process.env

// Avoid numbers to prevent clashes with numeric DEV.to article IDs
shortid.characters(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_-',
)

const createBookNode = (createNode: Actions['createNode'], book: BookNode) =>
  createNode({
    // Data for the node.
    imageUrl: book.imageUrl,
    link: book.link,
    date: book.date,
    title: book.title,

    // Required fields.
    id: shortid.generate(),
    parent: undefined,
    children: [],
    internal: {
      type: `Book`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(book))
        .digest(`hex`),
    },
  })

const createAlbumNode = (createNode: Actions['createNode'], album: AlbumNode) =>
  createNode({
    // Data for the node.
    artist: album.artist,
    title: album.title,
    date: album.date,
    link: album.link,
    imageUrl: album.imageUrl,

    // Required fields.
    id: shortid.generate(),
    parent: undefined,
    children: [],
    internal: {
      type: `Album`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(album))
        .digest(`hex`),
    },
  })

const createPodcastNode = (
  createNode: Actions['createNode'],
  podcast: PodcastNode,
) =>
  createNode({
    // Data for the node.
    artist: podcast.artist,
    title: podcast.title,
    date: podcast.date,
    link: podcast.link,
    imageUrl: podcast.imageUrl,

    // Required fields.
    id: shortid.generate(),
    parent: undefined,
    children: [],
    internal: {
      type: `Podcast`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(podcast))
        .digest(`hex`),
    },
  })

interface LikesNode {
  id: string
  link: string
  date: string
}

export interface BookNode extends LikesNode {
  imageUrl: string
  title: string
}

export interface AlbumNode extends LikesNode {
  artist: string
  imageUrl: string
  title: string
}

export interface PodcastNode extends LikesNode {
  artist: string
  imageUrl: string
  title: string
}

const dummyNode: LikesNode = {
  id: 'GENERATE ME EACH TIME',
  link: 'https://www.google.ca',
  date: '2020-01-01',
}

const dummyBookNode: BookNode = {
  ...dummyNode,
  imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  title: 'Title',
}

const dummyAlbumNode: AlbumNode = {
  ...dummyNode,
  artist: 'Artist',
  imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  title: 'Title',
}

const dummyPodcastNode: PodcastNode = {
  ...dummyNode,
  artist: 'Artist',
  imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
  title: 'Title',
}

const createDummyNodes = (createNode: Actions['createNode']) => {
  Array.from(Array(10).keys()).forEach(() => {
    createBookNode(createNode, { ...dummyBookNode, id: shortid.generate() })
    createAlbumNode(createNode, { ...dummyAlbumNode, id: shortid.generate() })
    createPodcastNode(createNode, { ...dummyPodcastNode, id: shortid.generate() })
  })
}

const createItunesNodes = (
  albumData: Array<AlbumNode>,
  podcastData: Array<PodcastNode>,
  bookData: Array<BookNode>,
  createNode: Actions['createNode'],
) => {
  // Don't waste time downloading + optimizing images in development
  if (LIKES_CONTENT === 'dummy') {
    createDummyNodes(createNode)
    return
  }

  // In production, use the real content
  for (let book of bookData) {
    createBookNode(createNode, book)
  }

  for (let album of albumData) {
    createAlbumNode(createNode, album)
  }

  for (let podcast of podcastData) {
    createPodcastNode(createNode, podcast)
  }
}

interface ITunesItem {
  date: string
  id: number
  name: string
}

type ITunesMedium = 'ebook' | 'music' | 'podcast'
type ITunesEntity = 'album' | 'ebook' | 'podcast'

// FIXME: separate by result type
interface ITunesResult {
  artistName?: string
  artworkUrl100: string
  collectionId?: number
  collectionViewUrl?: string
  date: string
  name: string
  trackId: number
  trackViewUrl?: string
}

interface ITunesAlbumResult extends ITunesResult {}
interface ITunesBookResult extends ITunesResult {}
interface ITunesPodcastResult extends ITunesResult {}

type Result = ITunesAlbumResult | ITunesBookResult | ITunesPodcastResult

interface FormattedResult {
  artist: string
  title: string
  id: string
  date: string
  link: string
  imageUrl: string
}

const searchiTunesAPI = async (
  items: Array<ITunesItem>,
  medium: ITunesMedium,
  entity: ITunesEntity,
): Promise<FormattedResult[]> => {
  const stringOfItemIDs = items.map(item => item.id).join(',')
  let formattedResults: Array<FormattedResult>

  // See: https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#lookup
  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${stringOfItemIDs}&country=CA&media=${medium}&entity=${entity}&sort=recent`,
    )

    const data = await response.json()

    formattedResults = data.results.map((result: Result) => {
      if (!result) {
        return null
      }

      const resultID: number = result.collectionId || result.trackId
      const matchingItem: ITunesItem | undefined = items.find(
        item => item.id === resultID,
      )

      if (!matchingItem) {
        console.log('No matching item...')
        console.log('matchingItem', matchingItem)
        console.log('result', result)
        console.log('resultID', resultID)
        return null
      }

      const artist = result.artistName
      const title = matchingItem.name
      const id = resultID
      const date = matchingItem.date
      const link = result.collectionViewUrl || result.trackViewUrl
      // See image srcset URLs used on books.apple.com:
      const imageUrl = result.artworkUrl100.replace('100x100bb', '400x0w')

      if (!title || !id || !date || !link || !imageUrl) {
        console.log(`Removed iTunes result:`, result)
        return null
      }

      return { artist, title, id, date, link, imageUrl }
    })
    return formattedResults
  } catch (error) {
    console.log('searchiTunesAPI error', error)
    return []
  }
}

exports.sourceNodes = async ({ actions }: SourceNodesArgs) => {
  const { createNode } = actions

  let albumData: any = []
  let podcastData: any = []
  let bookData: any = []

  // Don't waste time fetching data in development
  if (LIKES_CONTENT === 'actual') {
    albumData = await searchiTunesAPI(albums, 'music', 'album')
    podcastData = await searchiTunesAPI(podcasts, 'podcast', 'podcast')
    bookData = await searchiTunesAPI(books, 'ebook', 'ebook')
    await Promise.all([albumData, podcastData, bookData])
  }

  createItunesNodes(albumData, podcastData, bookData, createNode)
}
