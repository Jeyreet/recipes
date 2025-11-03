import { BaseRow } from 'types'

type Session = BaseRow<{
  userId: number
  tokenHash: string
  ip?: string
  os?: string
  browser?: string
}>

export { Session }
