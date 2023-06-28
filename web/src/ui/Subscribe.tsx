import React, { SyntheticEvent } from 'react'
import { useMachine } from '@xstate/react'

import { Emoji } from '.'
import { netlifyFormMachine } from '../logic/netlifyForm'

const emailRegex = `.+@.+..+`

const NetlifyForm = () => {
  const [state, send] = useMachine(netlifyFormMachine)

  const handleChange = (event: SyntheticEvent) => {
    const button = event.target as HTMLButtonElement
    send('UPDATE_FIELD', { name: 'email', value: button.value })
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    send('SUBMIT')
  }

  return (
    <>
      {state.value !== `success` && (
        <>
          <p className="mt-4 sm:mb-1 leading-normal text-lg iPhoneX:text-xl sm:text-2xl">
            Receive my latest content by email.
          </p>
          <small className="iPhoneX:text-sm sm:text-base">
            No spam. No email sharing. Unsubscribe any time.
          </small>

          <form data-netlify="true" name="Subscribe" onSubmit={handleSubmit}>
            {/* Hidden fields required by Netlify */}
            <input type="hidden" name="form-name" value="Subscribe" />
            <input type="hidden" name="email" />

            <div className="sm:flex sm:items-baseline mt-5 sm:shadow-md sm:rounded overflow-hidden sm:max-w-md">
              <input
                id="email"
                name="email"
                type="email"
                aria-label="Email address"
                placeholder="Your email address"
                onChange={handleChange}
                title={`The portion of the email address after the @ is invalid.`}
                pattern={emailRegex}
                required
                className="sm:flex-auto block shadow-md sm:shadow-none rounded sm:rounded-none purple-gradient py-2 px-3 w-full leading-normal text-center sm:text-left text-lg text-white placeholder-opacity-100 placeholder-white"
              />

              <button
                type="submit"
                className="sm:flex-none mt-1 sm:mt-0 shadow-md sm:shadow-none border-none rounded sm:rounded-none bg-gray-900 hover:bg-gray-800 py-2 px-3 sm:px-4 w-full sm:w-auto leading-normal text-lg text-white font-bold tracking-wider uppercase transition-colors duration-200 ease-in-out"
              >
                Sign Up
              </button>
            </div>
          </form>
        </>
      )}

      {state.value === `error` && (
        <p className="mt-2 leading-9">
          Oops! Please make sure you've entered a valid email address.
        </p>
      )}

      {state.value === `success` && (
        <p className="mt-2 leading-9">
          Thanks for subscribing!{' '}
          <Emoji
            emoji="🙌"
            ariaLabel="An emoji of two hands raised in appreciation."
          />
          <br />
          You'll be the first to know when I publish new content.
        </p>
      )}
    </>
  )
}

export default () => (
  <aside className="mt-16">
    <h2 className="text-4xl iPhoneX:text-5xl font-black">Subscribe</h2>
    <NetlifyForm />
  </aside>
)
