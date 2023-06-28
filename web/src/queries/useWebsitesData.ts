import { useStaticQuery, graphql } from 'gatsby'

export const toolLinks = {
  gatsby: `https://www.gatsbyjs.org`,
  'geocoder.ca': `https://geocoder.ca`,
  git: `https://git-scm.com`,
  github: `https://github.com`,
  gsap: `https://greensock.com`,
  jquery: `https://jquery.com`,
  netlify: `https://www.netlify.com`,
  postcss: `https://postcss.org`,
  pug: `https://pugjs.org`,
  react: `https://reactjs.org`,
  'react-player': `https://github.com/CookPete/react-player`,
  'react-spring': `https://www.react-spring.io`,
  sass: `https://sass-lang.com`,
  scrollreveal: `https://scrollrevealjs.org`,
  'styled-components': `https://www.styled-components.com`,
  tachyons: `https://tachyons.io`,
  tailwindcss: `https://tailwindcss.com`,
  vue: `https://vuejs.org`,
  xstate: `https://xstate.js.org`,
}

export type ToolName = keyof typeof toolLinks

export interface WebsiteData {
  description: string
  id: string
  link: string
  repo: string
  title: string
  tools: Array<ToolName>
}

export default (): Array<WebsiteData> =>
  useStaticQuery(
    graphql`
      {
        allSitesYaml {
          nodes {
            description
            id
            link
            repo
            title
            tools
          }
        }
      }
    `,
  ).allSitesYaml.nodes
