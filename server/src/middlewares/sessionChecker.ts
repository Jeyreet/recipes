import { AuthError } from 'errors'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { checkSession } from 'utils'

const sessionChecker =
  (neededAuth: boolean, onFailure?: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
    const session = await checkSession(req)

    res.locals.session = session

    if (neededAuth !== Boolean(session)) {
      if (onFailure) await onFailure(req, res, next)
      else throw new AuthError(neededAuth)
    } else next()
  }

export { sessionChecker }
