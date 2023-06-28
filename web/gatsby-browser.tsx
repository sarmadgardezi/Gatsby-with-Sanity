import React, { StrictMode } from 'react'
import 'what-input'
import { WrapRootElementBrowserArgs } from 'gatsby'

import './src/styles/tailwind.css'

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
  <StrictMode>{element}</StrictMode>
)
