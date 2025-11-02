import { AccessError } from 'errors'
import { NextFunction, Request, Response } from 'express'
import { permissionService } from 'services'

const permissionChecker = (name: string) => async (req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.session.userId
  const hasPermission = await permissionService.check({ userId, name })

  if (!hasPermission) throw new AccessError(name)

  next()
}

export { permissionChecker }
