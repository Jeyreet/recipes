import { Request } from 'express'

const getSessionParams = (req: Request) => {
  const xff = req.headers['x-forwarded-for']
  const ip = (Array.isArray(xff) ? xff[0] : xff)?.split(',')[0]?.trim() || req.socket?.remoteAddress || req.ip || null
  const os = req.useragent?.os || null
  const browser = req.useragent?.browser || null

  return { ip, os, browser }
}

export { getSessionParams }
