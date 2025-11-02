import { NextFunction, Request, Response } from 'express'

const dataMerger = (req: Request, res: Response, next: NextFunction) => {
  res.locals.data = {
    ...req.query,
    ...req.body,
  }

  next()
}

export { dataMerger }
