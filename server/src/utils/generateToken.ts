import { hash } from 'bcrypt'
import { randomBytes } from 'crypto'

const generateToken = async () => {
  const token = randomBytes(32).toString('hex')
  const tokenHash = await hash(token, 10)

  return [token, tokenHash] as const
}

export { generateToken }
