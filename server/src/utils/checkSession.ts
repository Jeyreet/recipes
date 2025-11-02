import { compare } from 'bcrypt'
import { Request } from 'express'
import { sessionService } from 'services'

const checkSession = async (req: Request) => {
  const fullToken = req.cookies.token || req.body?.token || req.query.token
  const [id, token] = fullToken?.split('-') || []

  if (!token || !id) return null

  const session = await sessionService.selectById({ id })

  if (!session) return null

  const valid = await compare(token, session.tokenHash)

  return valid ? session : null
}

export { checkSession }
