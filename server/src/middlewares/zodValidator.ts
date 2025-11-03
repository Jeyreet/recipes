import { ValidationError } from 'errors'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ZodType, z } from 'zod'

const transformPath = (path: string[]) => path.join('.')

const transformError = (i: any) => {
  switch (i.code) {
    case 'unrecognized_keys':
      return {
        params: i.keys,
      }
    case 'invalid_type':
      return {
        param: transformPath(i.path),
        expected: String(i.expected),
      }
    case 'invalid_value':
      return {
        param: transformPath(i.path),
      }
    case 'invalid_format':
      return {
        param: transformPath(i.path),
        pattern: i.pattern,
      }
    case 'too_big':
      return {
        param: transformPath(i.path),
        maximum: i.maximum,
      }
    case 'too_small':
      return {
        param: transformPath(i.path),
        minimum: i.minimum,
      }
    default:
      return i
  }
}

const zodValidator =
  (schema: Record<string, ZodType>, onFailure?: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, error } = z.object(schema).strict().safeParse(res.locals.data)

    if (!success) {
      if (onFailure) await onFailure(req, res, next)
      else throw new ValidationError(error.issues.map(i => ({ code: i.code, ...transformError(i) })))
    } else next()
  }

export { zodValidator }
