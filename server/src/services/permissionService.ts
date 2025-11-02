import { Permission } from 'types'
import { sendQuery } from 'utils'

const allColumns = 'id, name, user_id AS userId, created_at AS createdAt'

const sql = {
  select: `SELECT ${allColumns} FROM permissions WHERE user_id = :userId`,
  check: `SELECT COUNT(id) AS count FROM permissions WHERE user_id = :userId AND name = :name`,
  insert: 'INSERT INTO permissions SET user_id = :userId, name = :name',
  delete: 'DELETE FROM permissions WHERE user_id = :userId AND name = :name',
  deleteAll: 'DELETE FROM permissions WHERE user_id = :userId',
}

const permissionService = {
  select: async (params: { userId: any }) => {
    const result = await sendQuery<Permission>(sql.select, params)
    return result.map(r => r.name)
  },

  check: async (params: { userId: any; name: any }) => {
    const result = await sendQuery<{ count: number }>(sql.check, params, 'one')
    return Boolean(result?.count)
  },

  insert: (params: Pick<Permission, 'userId' | 'name'>) => sendQuery(sql.insert, params, 'insert'),

  delete: (params: { userId: any; name: any }) => sendQuery(sql.delete, params, 'delete'),

  deleteAll: (params: { userId: any }) => sendQuery(sql.deleteAll, params, 'delete'),
}

export { permissionService }
