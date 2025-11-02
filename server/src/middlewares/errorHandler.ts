import { ApiError, errorCodes } from 'errors'
import { NextFunction, Request, Response } from 'express'

const { NODE_ENV } = process.env

const errorHandler = (e: Error, req: Request, res: Response, next: NextFunction) => {
  if (e instanceof ApiError) {
    res.status(e.status).json({
      error: e.code,
      details: e.details,
    })
  } else {
    console.log(e)

    res.status(500).json({
      error: errorCodes.INTERNAL_ERROR,
      details: NODE_ENV === 'development' ? e : undefined,
    })
  }
}

export { errorHandler }
