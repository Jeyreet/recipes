import { permissions } from 'permissions'
import { BaseRow } from 'types'
import z from 'zod'

type Permission = BaseRow<{
  userId: number
  name: string
}>

const permission = {
  name: z.enum(Object.values(permissions)),
}

export { Permission, permission }
