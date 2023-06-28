declare module '*.jpg'
declare module '*.png'

// See: https://medium.com/@karllsonVomDach/jest-typescript-and-svgs-44b4333a1164
declare module '*.svg' {
  const content: any
  export const ReactComponent: any
  export default content
}

declare module '*.woff'
declare module '*.woff2'
