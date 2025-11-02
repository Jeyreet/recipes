import { sessionController } from 'controllers'
import { Router } from 'express'
import { sessionChecker, zodValidator } from 'middlewares'
import { catchError } from 'utils'
import z from 'zod'

const sessionRouter = Router()

sessionRouter.post(
  '/',
  zodValidator({ login: z.string(), password: z.string() }),
  sessionChecker(false),
  catchError(sessionController.signIn),
)
sessionRouter.delete('/', sessionChecker(true), catchError(sessionController.signOut))

export { sessionRouter }
