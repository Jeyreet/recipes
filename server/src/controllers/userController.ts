import { hash } from 'bcrypt'
import { DataNotFoundError } from 'errors'
import { Request, Response } from 'express'
import { userService } from 'services'

const userController = {
  get: async (req: Request, res: Response) => {
    const id = (res.locals.data.id || res.locals.session.userId) as number
    const user = await userService.selectById({ id })

    if (!user) throw new DataNotFoundError({ id })

    res.status(200).json({ user: { ...user, passwordHash: undefined } })
  },

  searchByLogin: async (req: Request, res: Response) => {
    const login = res.locals.data.login as string
    const users = await userService.selectByLoginLike({ login })

    res.status(200).json({ users: users.map(user => ({ ...user, passwordHash: undefined })) })
  },

  signUp: async (req: Request, res: Response) => {
    const login = res.locals.data.login as string
    const password = res.locals.data.password as string
    const passwordHash = await hash(password, 10)
    const id = await userService.insert({ login, passwordHash })

    res.status(201).json({ id })
  },
}

export { userController }
