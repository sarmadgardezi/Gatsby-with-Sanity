import React from 'react'

import { Base } from '../ui'

export default () => (
  <Base>
    <main className="flex justify-center items-center absolute inset-0 text-center">
      <div className="flex flex-col justify-center items-center">
        <header>
          <h1 className="text-10xl iPhoneX:text-11xl sm:text-14xl font-black whitespace-no-wrap">
            404
          </h1>
        </header>
        <p className="mt-4 text-3xl sm:text-4xl font-extrabold">
          Oh no! This page doesn't exist.
        </p>
      </div>
    </main>
  </Base>
)
