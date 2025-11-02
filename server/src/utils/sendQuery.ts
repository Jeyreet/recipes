import { DataNotFoundError, DuplicateValueError } from 'errors'
//@ts-ignore
import namedPlaceholders from 'named-placeholders'
import { pool } from 'pool'

type Params = Record<string, any>
type Rule = 'one' | 'insert' | 'update' | 'delete' | undefined

type SendQuery = {
  <T extends object>(sql: string, params?: Params, rule?: undefined): Promise<T[]>
  <T extends object>(sql: string, params: Params, rule: 'one'): Promise<T | undefined>
  (sql: string, params: Params, rule: 'insert' | 'update' | 'delete'): Promise<number>
}

const np = namedPlaceholders()

const sendQuery: SendQuery = async (sql: string, params: Params = {}, rule?: Rule) => {
  const conn = await pool.getConnection()

  try {
    const [parsedSql, values] = np(sql, params)
    const result = await conn.query(parsedSql, values)

    switch (rule) {
      case 'one':
        return (result as any)[0]
      case 'insert':
        return (result as any).insertId
      case 'update':
      case 'delete':
        return (result as any).affectedRows
      default:
        return result
    }
  } catch (e: any) {
    if (e.code === 'ER_DUP_ENTRY') {
      const match = e.message.match?.(/Duplicate entry '([^']+)' for key '?([^']+)'?/)

      if (match) {
        const [, value, key] = match
        throw new DuplicateValueError(key, value)
      }
    } else if (e.code === 'ER_NO_REFERENCED_ROW_2') {
      const match = e.message.match?.(/(?<=FOREIGN KEY\s*\()\s*`([^`]+)`(?=\))/)

      if (match) {
        const [, value, key] = match
        throw new DataNotFoundError({ [key]: value })
      }
    } else {
      throw e
    }
  } finally {
    conn.release()
  }
}

export { sendQuery }
