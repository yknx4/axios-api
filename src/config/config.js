import invariant from 'invariant'
import dotenv from 'dotenv'

dotenv.config()

export const APP_NAME = 'Axios API'
export const ENVIRONMENT = process.env.NODE_ENV

invariant(ENVIRONMENT, 'Did you set your ENVIRONMENT in your .env file?')
invariant(APP_NAME, 'Did you set your APP_NAME in your .env file?')

export const HTTP_SERVER_PORT = (env =>
  ({ production: 3000, test: 4004, development: 5005 }[env] || 6006))(
  ENVIRONMENT
)
