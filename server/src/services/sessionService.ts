import { Session } from 'types'
import { sendQuery } from 'utils'

const allColumns = 'id, user_id AS userId, token_hash AS tokenHash, ip, os, browser, created_at AS createdAt'

const sql = {
  selectById: `SELECT ${allColumns} FROM sessions WHERE id = :id`,
  selectByUserId: `SELECT ${allColumns} FROM sessions WHERE user_id = :userId`,
  insert: 'INSERT INTO sessions SET user_id = :userId, token_hash = :tokenHash, ip = :ip, os = :os, browser = :browser',
  deleteById: 'DELETE FROM sessions WHERE id = :id',
  deleteByUserId: 'DELETE FROM sessions WHERE user_id = :userId',
  deleteByUserIdExceptId: 'DELETE FROM sessions WHERE id != :id AND user_id = :userId',
}

const sessionService = {
  selectById: (params: { id: any }) => sendQuery<Session>(sql.selectById, params, 'one'),

  selectByUserId: (params: { userId: any }) => sendQuery<Session>(sql.selectByUserId, params),

  insert: (params: Pick<Session, 'userId' | 'tokenHash'> | Partial<Pick<Session, 'ip' | 'os' | 'browser'>>) =>
    sendQuery(sql.insert, params, 'insert'),

  deleteById: (params: { id: any }) => sendQuery(sql.deleteById, params, 'delete'),

  deleteByUserId: (params: { userId: any }) => sendQuery(sql.deleteByUserId, params, 'delete'),

  deleteByUserIdExceptId: (params: { id: any; userId: any }) => sendQuery(sql.deleteByUserIdExceptId, params, 'delete'),
}

export { sessionService }
