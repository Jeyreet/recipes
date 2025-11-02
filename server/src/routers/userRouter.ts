import { userController } from 'controllers'
import { Router } from 'express'
import { sessionChecker, zodValidator } from 'middlewares'
import { id, user } from 'types'
import { catchError } from 'utils'
import z from 'zod'

const userRouter = Router()

userRouter.post(
  '/',
  zodValidator({ login: user.login, password: user.password }),
  sessionChecker(false),
  catchError(userController.signUp),
)
userRouter.get('/', zodValidator({ id }, sessionChecker(true)), catchError(userController.get))
userRouter.get('/search', zodValidator({ login: z.string() }), catchError(userController.searchByLogin))

export { userRouter }
