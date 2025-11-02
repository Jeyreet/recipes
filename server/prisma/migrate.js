import { execSync } from 'child_process'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const dbUrl = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

const date = new Date()
const pad = n => n.toString().padStart(2, '0')
const timestamp =
  [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join('-') +
  '_' +
  [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join('-')
const migrationsDirPath = path.resolve('migrations')
const filePath = path.join(migrationsDirPath, `${timestamp}_diff.sql`)

if (!fs.existsSync(migrationsDirPath)) fs.mkdirSync(migrationsDirPath, { recursive: true })

execSync(
  `npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-url "${dbUrl}" --script > "${filePath}"`,
  { stdio: 'inherit', shell: true },
)

const content = fs.readFileSync(filePath, 'utf8').trim()

if (content === '-- This is an empty migration.') {
  fs.unlinkSync(filePath)
  console.log('There is not changes to migrate')
} else {
  execSync(`DB_URL="${dbUrl}" npx prisma db pull`, { stdio: 'inherit', shell: true })
  console.log('Migrated well')
}
