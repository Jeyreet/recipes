import { AuthError } from 'errors'
import { NextFunction, Request, Response } from 'express'
import { checkSession } from 'utils'

const sessionChecker = (neededAuth: boolean) => async (req: Request, res: Response, next: NextFunction) => {
  const session = await checkSession(req)

  if ((neededAuth && !session) || (!neededAuth && session)) throw new AuthError(neededAuth)

  res.locals.session = session

  next()
}

export { sessionChecker }
