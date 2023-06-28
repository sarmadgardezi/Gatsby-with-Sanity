import dotenv from 'dotenv'
import getYouTubeID from 'get-youtube-id'

dotenv.config()

// TODO: extract chunks and create types for them that can be reused by GraphQL queries
export const siteMetadata = {
  // set unused properties to `` (removing the line breaks the query)
  title: `Michael Uloth`,
  jobTitle: `Web Developer and Opera Singer`,
  description: `Hi! 👋 I'm Michael. I'm a web developer and opera singer currently working for ecobee in Toronto. This site includes my recent blog posts, videos, websites and opera projects. If you'd like to work together, feel free to get in touch.`,
  siteUrl: `https://www.michaeluloth.com`, // no trailing slash
  lang: `en`,
  locale: `en_CA`,
  email: `hello@michaeluloth.com`,
  telephone: `+`,
  address: {
    street: ``,
    locality: `Toronto`,
    region: `ON`,
    postalCode: ``,
    country: `CA`,
  },
  socialLinks: [
    `https://www.youtube.com/user/michaeluloth`,
    `https://twitter.com/ooloth`,
    `https://www.linkedin.com/in/michael-uloth-848a1b98`,
    `https://github.com/ooloth`,
    `https://stackoverflow.com/users/8802485/ooloth`,
    `https://dev.to/ooloth`,
    `https://www.freecodecamp.org/news/author/ooloth/`,
    `https://medium.com/@michaeluloth`,
    `https://www.facebook.com/michaeluloth`,
    `https://www.instagram.com/ooloth/`,
  ],
  structuredDataType: `Person`,
  twitterSite: `@ooloth`,
  twitterCreator: `@ooloth`,
  googleSearchConsoleSiteVerification:
    process.env.GOOGLE_SITE_VERIFICATION_SEARCH_CONSOLE,
  gSuiteSiteVerification: process.env.GOOGLE_SITE_VERIFICATION_GSUITE,
  blogPage: {
    title: `Michael Uloth | Writes`,
    description: `Coding tips and walk-throughs to help future me get unstuck.`,
    url: `https://www.michaeluloth.com/writes`,
  },
  likesPage: {
    title: `Michael Uloth | Likes`,
    description: `Fun stuff that makes me happy.`,
    url: `https://www.michaeluloth.com/likes`,
  },
  operaPage: {
    title: `Michael Uloth | Sings`,
    description: `Concerts and operas I've been lucky enough to perform.`,
    url: `https://www.michaeluloth.com/sings`,
  },
  websitesPage: {
    title: `Michael Uloth | Codes`,
    description: `Sites I've built for fun and profit.`,
    url: `https://www.michaeluloth.com/codes`,
  },
}

/**
 * Custom YouTube link transformer for gatsby-remark-embedder
 */

const getIframe = (url: string): string =>
  String(
    `<div class="my-8 ratio-16x9 rounded purple-gradient">
      <iframe src="https://youtube.com/embed/${getYouTubeID(
        url,
      )}" class="shadow-lg rounded" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    </div>`,
  )

/**
 * Plugins
 */

export const plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `src`,
      path: `${__dirname}/src/`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `content`,
      path: `${__dirname}/content/`,
    },
  },
  // TODO: enable when/if I want to use components in MD:
  // {
  //   resolve: 'gatsby-plugin-page-creator',
  //   options: {
  //     path: `${__dirname}/content/posts`,
  //   },
  // },
  // {
  //   resolve: `gatsby-plugin-mdx`,
  //   options: {
  //     extensions: [`.mdx`, `.md`],
  //   },
  // },
  {
    resolve: `gatsby-plugin-remote-images`,
    options: {
      nodeType: `TvShow`,
      imagePath: `imageUrl`,
      name: `image`,
    },
  },
  {
    resolve: `gatsby-plugin-remote-images`,
    options: {
      nodeType: `Movie`,
      imagePath: `imageUrl`,
      name: `image`,
    },
  },
  {
    resolve: `gatsby-plugin-remote-images`,
    options: {
      nodeType: `Book`,
      imagePath: `imageUrl`,
      name: `image`,
    },
  },
  {
    resolve: `gatsby-plugin-remote-images`,
    options: {
      nodeType: `Album`,
      imagePath: `imageUrl`,
      name: `image`,
    },
  },
  {
    resolve: `gatsby-plugin-remote-images`,
    options: {
      nodeType: `Podcast`,
      imagePath: `imageUrl`,
      name: `image`,
    },
  },
  `gatsby-plugin-postcss`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-svgr`,
  `gatsby-source-itunes`, // my custom source plugin
  `gatsby-source-tmdb`, // my custom source plugin
  `gatsby-transformer-sharp`,
  `gatsby-transformer-yaml`,
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      commonmark: true,
      footnotes: true,
      gfm: true,
      pedantic: false,
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            linkImagesToOriginal: false,
            maxWidth: 1000,
            quality: 80,
            showCaptions: true,
            withWebp: true,
          },
        },
        `gatsby-remark-unwrap-images`,
        {
          resolve: `gatsby-remark-embedder`,
          options: {
            customTransformers: [
              {
                // Add a wrapper and some custom classes to the HTML output:
                getHTML: (url: string) => getIframe(url),
                name: 'YouTube',
                shouldTransform: (url: string) =>
                  /^https?:\/\/(youtu.be\/|youtube.com\/)/.test(url),
              },
            ],
            services: {
              // The service-specific options by the name of the service
            },
          },
        },
        {
          resolve: `gatsby-remark-vscode`,
          options: {
            theme: 'Dracula',
            extensions: ['theme-dracula'],
            injectStyles: false, // importing css file instead
            inlineCode: {
              marker: '•',
            },
          },
        },
        {
          resolve: `gatsby-remark-smartypants`,
          options: {
            dashes: `oldschool`,
          },
        },
        `gatsby-remark-a11y-emoji`,
      ],
    },
  },
  `gatsby-plugin-twitter`,
  {
    resolve: `gatsby-plugin-catch-links`,
    options: {
      excludePattern: /(youtu|twitter)/,
    },
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { allMarkdownRemark } }: { query: any }) => {
            return allMarkdownRemark.nodes.map((node: any) => {
              return Object.assign({}, node, {
                title: node.frontmatter.title,
                description: node.frontmatter.description,
                date: node.frontmatter.datePublished,
                url: `${siteMetadata.siteUrl}/${node.frontmatter.slug}`,
                guid: `${siteMetadata.siteUrl}/${node.frontmatter.slug}`,
                custom_elements: [{ 'content:encoded': node.html }],
              })
            })
          },
          query: `
            {
              allMarkdownRemark(
                filter: { frontmatter: { published: { eq: true } } }
                sort: { fields: frontmatter___datePublished, order: DESC }
              ) {
                nodes {
                  frontmatter {
                    datePublished(formatString: "MMM D, YYYY")
                    description
                    slug
                    title
                  }
                  html
                }
              }
            }
          `,
          output: `/rss.xml`,
          title: `Michael Uloth's Blog`,
        },
      ],
    },
  },
  `gatsby-plugin-sitemap`,
  {
    resolve: `gatsby-plugin-robots-txt`,
    // Disable crawlers for Netlify deploy-previews:
    options: {
      resolveEnv: () => process.env.NODE_ENV,
      env: {
        production: {
          policy: [{ userAgent: `*` }],
        },
        'branch-deploy': {
          policy: [{ userAgent: `*`, disallow: [`/`] }],
          sitemap: null,
          host: null,
        },
        'deploy-preview': {
          policy: [{ userAgent: `*`, disallow: [`/`] }],
          sitemap: null,
          host: null,
        },
      },
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Michael Uloth`,
      short_name: `M. Uloth`,
      start_url: `/`,
      // Splash screen when app launches:
      background_color: `#964cf0`,
      // Tool bar and task switcher:
      theme_color: `#964cf0`,
      display: `minimal-ui`,
      // Icon and favicon copies will automatically generated and used.
      icon: `./src/images/michael-uloth-circle.png`,
    },
  },
  // bust old service worker versions in Safari showing the old site 🧨
  `gatsby-plugin-remove-serviceworker`,
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      head: true, // https://csswizardry.com/2018/11/css-and-network-performance/
      anonymize: true,
      respectDNT: true,
    },
  },
  {
    resolve: `gatsby-plugin-netlify`, // must come last
    options: {
      headers: {
        // First one is required for the HSTS list:
        '/*': [
          `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`,
        ],
        '/*.html': [`Cache-Control: public,max-age=0,must-revalidate`],
        '/*.js': [`Cache-Control: public,max-age=0,must-revalidate`],
        '/sw.js': [`Cache-Control: max-age=0,no-cache,no-store,must-revalidate`],
        '/icons/*': [`Cache-Control: public,max-age=31536000,immutable`],
        '/static/*': [`Cache-Control: public,max-age=31536000,immutable`],
      },
    },
  },
]
