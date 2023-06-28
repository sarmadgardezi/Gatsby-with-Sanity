import { useStaticQuery, graphql } from 'gatsby'

interface Address {
  country: string
  locality: string
  region: string
  postalCode: string
  street: string
}

interface Page {
  description: string
  title: string
  url: string
}

export interface SiteMetadata {
  address: Address
  blogPage: Page
  description: string
  email: string
  googleSearchConsoleSiteVerification: string
  gSuiteSiteVerification: string
  jobTitle: string
  lang: 'en'
  likesPage: Page
  locale: 'en_CA' | 'en_US'
  operaPage: Page
  siteUrl: string
  socialLinks: string[]
  structuredDataType: 'Person' | 'Business'
  telephone: string
  title: string
  twitterSite: string
  twitterCreator: string
  websitesPage: Page
}

export default (): SiteMetadata =>
  useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
            jobTitle
            description
            siteUrl
            lang
            locale
            email
            telephone
            address {
              street
              locality
              region
              postalCode
              country
            }
            socialLinks
            structuredDataType
            twitterSite
            twitterCreator
            googleSearchConsoleSiteVerification
            gSuiteSiteVerification
            blogPage {
              title
              description
              url
            }
            likesPage {
              title
              description
              url
            }
            operaPage {
              title
              description
              url
            }
            websitesPage {
              title
              description
              url
            }
          }
        }
      }
    `,
  ).site.siteMetadata
