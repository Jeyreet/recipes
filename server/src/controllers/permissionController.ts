import { DataNotFoundError } from 'errors'
import { Request, Response } from 'express'
import { permissionService, userService } from 'services'

const permissionController = {
  get: async (req: Request, res: Response) => {
    const id = (res.locals.data.id || res.locals.session.userId) as number
    const permissions = await permissionService.select({ userId: id })

    res.status(200).json({ permissions })
  },

  add: async (req: Request, res: Response) => {
    const id = (res.locals.data.id || res.locals.session.userId) as number
    const name = res.locals.data.name as string

    if (!(await userService.selectById({ id }))) throw new DataNotFoundError({ id })

    if (await permissionService.insert({ userId: id, name })) res.status(201).json()
    else throw new DataNotFoundError({ name })
  },

  remove: async (req: Request, res: Response) => {
    const id = (res.locals.data.id || res.locals.session.userId) as number
    const name = res.locals.data.name as string

    if (!(await userService.selectById({ id }))) throw new DataNotFoundError({ id })

    if (await permissionService.delete({ userId: id, name })) res.status(204).json()
    else throw new DataNotFoundError({ name })
  },

  removeAll: async (req: Request, res: Response) => {
    const id = (res.locals.data.id || res.locals.session.userId) as number

    if (!(await userService.selectById({ id }))) throw new DataNotFoundError({ id })

    await permissionService.deleteAll({ userId: id })
    res.status(204).json()
  },
}

export { permissionController }
