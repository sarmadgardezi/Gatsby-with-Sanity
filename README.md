# mu-gatsby

This is the source code for the sixth version of my personal website.

## Project Structure

- The site is built in [React](https://reactjs.org) using [Gatsby](https://www.gatsbyjs.org). (If you're new to Gatsby, check it out! It's a game-changer.)
- The logic is written using [TypeScript](https://www.typescriptlang.org) to enable static type checking and easier debugging
- The `CSS` is written using [styled-components](https://www.styled-components.com) to make it easy to avoid styling clashes, remove styles without unintended side effects, and automatically load only styles that are actually used
- The content is stored in `YAML` files in `content/` (separated for easy updating)
- The site uses [GraphQL](https://graphql.org) to pull content from the `YAML` files into the relevant React components
- The blog is written using [MDX](https://mdxjs.com) to allow React components to be used in the posts

## Deployment

- The site is hosted by [Netlify](https://www.netlify.com) (free tier)
- When this repo changes, Netlify automatically builds a new version of the site
- The build process runs the site's GraphQL queries and generates optimized static assets (i.e. `HTML` + `JS` + images)
- The static files are deployed to Netlify's global CDN
- When a user visits the site, the static version loads first (for a fast loading experience)
- The site then hydrates into a single-page React app
