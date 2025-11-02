import { User } from 'types'
import { sendQuery } from 'utils'

const allColumns = 'id, login, password_hash AS passwordHash, name, created_at AS createdAt'

const sql = {
  selectById: `SELECT ${allColumns} FROM users WHERE id = :id`,
  selectByLogin: `SELECT ${allColumns} FROM users WHERE login = :login`,
  selectByLoginLike: `SELECT ${allColumns} FROM users WHERE login LIKE :login LIMIT 50`,
  insert: 'INSERT INTO users SET login = :login, password_hash = :passwordHash',
}

const userService = {
  selectById: (params: { id: any }) => sendQuery<User>(sql.selectById, params, 'one'),

  selectByLogin: (params: { login: any }) => sendQuery<User>(sql.selectByLogin, params, 'one'),

  selectByLoginLike: (params: { login: any }) => {
    params.login = `%${params.login}%`
    return sendQuery<User>(sql.selectByLoginLike, params)
  },

  insert: (params: Pick<User, 'login' | 'passwordHash'>) => sendQuery(sql.insert, params, 'insert'),
}

export { userService }
