import { NextFunction, Request, RequestHandler, Response } from 'express'

const catchError = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

export { catchError }
