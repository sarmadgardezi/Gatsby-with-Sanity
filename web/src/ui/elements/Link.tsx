import React, { ReactNode } from 'react'
import { Link } from 'gatsby'

const classes = {
  underline: 'purple-gradient purple-underline',
  icon: 'flex justify-center items-center hover:purple-gradient hover:text-white',
  incognito: '',
}

type Variant = keyof typeof classes

interface Props {
  variant: Variant
  href: string
  children: ReactNode
  className?: string
  srText?: string // if anchor has no visible text
  lang?: string
}

export default ({
  variant,
  href,
  children,
  className,
  srText,
  lang,
  ...props
}: Props) => {
  const isExternal = Boolean(href.match(/http|\/\/|mailto:|tel:|static\/|pdf\//))
  const isId = Boolean(href.match(/^#/))
  const variantClasses: string = classes[variant]

  return isExternal || isId ? (
    <a
      href={href}
      className={`${variantClasses} ${className}`}
      rel={isExternal ? `noopener noreferrer` : undefined}
      onClick={e => e.stopPropagation()} // avoid firing parent event handlers
      lang={lang}
      {...props}
    >
      {srText && <span className="sr-only">{srText}</span>}
      {children}
    </a>
  ) : (
    <Link
      to={href}
      className={`${variantClasses} ${className}`}
      onClick={e => e.stopPropagation()} // avoid firing parent event handlers
      lang={lang}
      {...props}
    >
      {srText && <span className="sr-only">{srText}</span>}
      {children}
    </Link>
  )
}

/*

- See: https://stackoverflow.com/questions/1369035/how-do-i-prevent-a-parents-onclick-event-from-firing-when-a-child-anchor-is-cli
- See: https://stackoverflow.com/questions/37568550/react-prevent-event-trigger-on-parent-from-child

*/
