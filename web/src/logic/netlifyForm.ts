import { Machine } from 'xstate'

interface NetlifyFormContext {
  formName: string
  values: {
    email: string
  }
}

interface NetlifyFormStateSchema {
  states: {
    filling: {}
    sending: {}
    error: {}
    success: {}
  }
}

type NetlifyFormEvent =
  | { type: 'UPDATE_FIELD'; name: 'email'; value: string }
  | { type: 'SUBMIT' }
  | { type: 'error.execution'; data: string }

type NetlifySubmissionData = {
  'form-name': string
  email: string
  [key: string]: string
}

const updateField = (ctx: NetlifyFormContext, event: NetlifyFormEvent): void => {
  if (event.type === 'UPDATE_FIELD') {
    ctx.values[event.name] = event.value
  }
}

// See: https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/

const constructEncodedUrl = (formData: NetlifySubmissionData): string =>
  Object.keys(formData)
    .map(key => encodeURIComponent(key) + `=` + encodeURIComponent(formData[key]))
    .join(`&`)

const sendFormToNetlify = async (ctx: NetlifyFormContext): Promise<Response> => {
  const encodedUrl: string = constructEncodedUrl({
    'form-name': ctx.formName,
    ...ctx.values,
  })

  return await fetch(`/`, {
    method: `POST`,
    headers: { 'Content-Type': `application/x-www-form-urlencoded` },
    body: encodedUrl,
  })
}

export const netlifyFormMachine = Machine<
  NetlifyFormContext,
  NetlifyFormStateSchema,
  NetlifyFormEvent
>(
  {
    id: 'netlifyFormMachine',
    context: {
      formName: 'Subscribe',
      values: {
        email: '',
      },
    },
    initial: 'filling',
    states: {
      filling: {
        on: {
          UPDATE_FIELD: {
            actions: 'updateField',
          },
          SUBMIT: 'sending',
        },
      },

      sending: {
        invoke: {
          src: 'sendFormToNetlify',
          onDone: 'success',
          onError: 'error',
        },
      },

      error: {
        entry: 'logError',
        on: { SUBMIT: 'sending' },
      },

      success: {},
    },
  },
  {
    actions: {
      updateField,
      logError: (ctx, event) =>
        event.type === 'error.execution' && console.log('error: ', event.data),
    },

    services: {
      sendFormToNetlify,
    },
  },
)
