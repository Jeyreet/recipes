import { compare } from 'bcrypt'
import { DataNotFoundError, ValidationError } from 'errors'
import { Request, Response } from 'express'
import { sessionService, userService } from 'services'
import { generateToken, getSessionParams } from 'utils'
import { cookieOptions } from 'utils'

const sessionController = {
  signIn: async (req: Request, res: Response) => {
    const login = res.locals.data.login as string
    const password = res.locals.data.password as string
    const user = await userService.selectByLogin({ login })

    if (!user) throw new DataNotFoundError({ login })

    const passwordValid = await compare(password, user.passwordHash)

    if (!passwordValid) throw new ValidationError({ error: 'invalid_password' })

    const [token, tokenHash] = await generateToken()
    const ipOsBrowser = getSessionParams(req)
    const id = await sessionService.insert({ userId: user.id, tokenHash, ...ipOsBrowser })

    res.status(201).cookie('token', `${id}-${token}`, cookieOptions).json({ token })
  },

  signOut: (req: Request, res: Response) => {
    const id = res.locals.session.id as number
    sessionService.deleteById({ id })

    res.status(204).clearCookie('token').json()
  },
}

export { sessionController }
