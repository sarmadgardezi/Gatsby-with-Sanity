// See: https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget/

require('dotenv').config()
const nodeFetch = require('node-fetch')

exports.handler = async event => {
  const email = JSON.parse(event.body).payload.email
  console.log(`Received a newsletter sign-up for ${email}`)

  return nodeFetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then(() => console.log(`Submitted email to Buttondown successfully.`))
    .catch(error => {
      console.log('error', error)
      return { statusCode: 422, body: String(error) }
    })
}
