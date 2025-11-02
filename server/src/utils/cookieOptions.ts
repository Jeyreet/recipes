import { CookieOptions } from 'express'

const { NODE_ENV } = process.env

const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 30,
  sameSite: 'lax',
  secure: !(NODE_ENV === 'development'),
}

export { cookieOptions }
