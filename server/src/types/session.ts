import { BaseRow, id } from 'types'
import z from 'zod'

type Session = BaseRow<{
  userId: number
  tokenHash: string
  ip?: string
  os?: string
  browser?: string
}>

const session = {
  tokenHash: z.string(),
  ip: z.string().optional(),
  os: z.string().optional(),
  browser: z.string().optional(),
}

export { Session, session }
