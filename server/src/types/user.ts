import { BaseRow } from 'types'
import z from 'zod'

type User = BaseRow<{
  login: string
  passwordHash: string
  name?: string
}>

const user = {
  login: z.string().min(4).max(40).regex(/^[A-Za-z0-9]+$/),
  password: z.string().min(4).max(100).regex(/^[^\sА-Яа-яЁё]+$/),
  name: z.string().min(4).max(40),
}

export { User, user }
