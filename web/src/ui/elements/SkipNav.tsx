import React from 'react'

export default ({ href }: { href: string }) => (
  <a href={href} className="sr-only">
    Skip navigation and go to main content
  </a>
)

/*

USAGE:

1. Include before any header/sidebar links that appear at the top of each page
2. Make sure the href prop matches the ID of the page element where the main content begins

See: https://medium.freecodecamp.org/next-level-accessibility-freecodecamp-guide-7cbd6473eabd

*/
