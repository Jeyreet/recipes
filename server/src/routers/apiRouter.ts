import { Router } from 'express'
import { permissionRouter, sessionRouter, userRouter } from 'routers'

const apiRouter = Router()

apiRouter.use('/session', sessionRouter)
apiRouter.use('/permission', permissionRouter)
apiRouter.use('/user', userRouter)

export { apiRouter }
