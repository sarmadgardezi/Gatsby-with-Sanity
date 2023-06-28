import React from 'react'
import { Helmet } from 'react-helmet'

import useSiteMetadata, { SiteMetadata } from '../queries/useSiteMetadata'
import siteImage from '../images/michael-uloth-landscape.jpg'

interface StructuredData {
  image: string
  site: SiteMetadata
}

const StructuredData = ({ site, image }: StructuredData) => {
  const {
    structuredDataType,
    siteUrl,
    title,
    jobTitle,
    description,
    email,
    telephone,
  } = site
  const { street, locality, region, country } = site.address
  const sameAs = site.socialLinks.map(link => `"${link}"`)

  const structuredData = `{
    "@context": "http://schema.org",
    "@type": "${structuredDataType}",
    "@id": "${siteUrl}",
    "name": "${title}",
    ${jobTitle && `"jobTitle": "${jobTitle}",`}
    "description": "${description}",
    "url": "${siteUrl}",
    "image": "${image.replace(`js/../`, ``)}",
    ${email && `"email": "mailto:${email}",`}
    ${telephone && `"telephone": "${telephone}",`}
    ${
      (street || locality || region || country) &&
      `"address": {
        "@type": "PostalAddress",
        ${street && `"streetAddress": "${street}",`}
        ${locality && `"addressLocality": "${locality}",`}
        ${region && `"addressRegion": "${region}",`}
        ${country && `"addressCountry": "${country}"`}
      },
    `
    }
    "sameAs": [${sameAs}]
  }`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredData }}
    />
  )
}

interface PageMetadata {
  author?: string
  description: string
  lang?: string
  image?: string
  title: string
  type?: string
  url: string
}

interface PreloadResource {
  as: string
  href: string
  type: string
}

interface Metadata {
  page?: PageMetadata
  preconnect?: string[]
  preload?: PreloadResource[]
}

export default ({ page, preconnect, preload }: Metadata) => {
  const site = useSiteMetadata()

  // Use sitewide metadata unless overridden by page-specific metadata
  const lang = (page && page.lang) || site.lang
  const title = ((page && page.title) || site.title).replace(`&nbsp;`, ` `)
  const description = (page && page.description) || site.description
  const url = (page && page.url) || site.siteUrl
  const type = (page && page.type) || `website`
  const image =
    (page && page.image && site.siteUrl + page.image) || site.siteUrl + siteImage

  return (
    <>
      <Helmet>
        {/* HTML language */}
        <html itemScope itemType="http://schema.org/WebPage" lang={lang} />

        {/* Title first (Gatsby already adds meta charset and viewport) */}
        <title itemProp="name">{title}</title>

        {/* Search engine */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <link rel="canonical" href={url} />

        {/* Preconnect to external resources */}
        {preconnect &&
          preconnect.map(url => <link key={url} rel="preconnect" href={url} />)}

        {/* Preloaded above-the-fold static assets (fonts, audio, video) */}
        {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content */}
        {preload &&
          preload.map(resource => (
            <link
              key={resource.href}
              rel="preload"
              href={resource.href}
              as={resource.as}
              type={resource.type}
              crossOrigin="anonymous"
            />
          ))}

        {/* Schema.org for Google */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Open Graph general (Facebook, Pinterest, Slack) */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={site.title} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:locale" content={site.locale} />

        {/* Non-essential, but required for analytics */}
        <meta name="twitter:site" content={site.twitterSite} />
        <meta name="twitter:site" content={site.twitterCreator} />

        {/* Site ownership verification */}
        <meta
          name="google-site-verification"
          content={site.googleSearchConsoleSiteVerification}
        />
        <meta
          name="google-site-verification"
          content={site.gSuiteSiteVerification}
        />
      </Helmet>

      <StructuredData site={site} image={image} />
    </>
  )
}
