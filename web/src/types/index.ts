// See: gatsby/packages/gatsby-transformer-sharp/src/fragments.js
export interface GatsbyImageFixedWithWebp {
  childImageSharp: {
    fixed: {
      base64: string
      aspectRatio: number
      height: number
      src: string
      srcSet: string
      srcWebp: string
      srcSetWebp: string
      width: number
    }
  }
}

// See: gatsby/packages/gatsby-transformer-sharp/src/fragments.js
export interface GatsbyImageFluidWithWebp {
  childImageSharp: {
    fluid: {
      base64: string
      aspectRatio: number
      src: string
      srcSet: string
      srcWebp: string
      srcSetWebp: string
      sizes: string
    }
  }
}
