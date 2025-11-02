import { permissionController } from 'controllers'
import { Router } from 'express'
import { permissionChecker, sessionChecker, zodValidator } from 'middlewares'
import { id, permission } from 'types'
import { catchError } from 'utils'

const permissionRouter = Router()

permissionRouter.get(
  '/',
  zodValidator({ id: id.optional() }),
  sessionChecker(true),
  permissionChecker('get_permission'),
  catchError(permissionController.get),
)
permissionRouter.post(
  '/',
  zodValidator({ id: id.optional(), name: permission.name }),
  sessionChecker(true),
  permissionChecker('add_permission'),
  catchError(permissionController.add),
)
permissionRouter.delete(
  '/',
  zodValidator({ id: id.optional(), name: permission.name }),
  sessionChecker(true),
  permissionChecker('remove_permission'),
  catchError(permissionController.remove),
)
permissionRouter.delete(
  '/all',
  zodValidator({ id, name: permission.name }),
  sessionChecker(true),
  permissionChecker('remove_permission'),
  catchError(permissionController.removeAll),
)

export { permissionRouter }
