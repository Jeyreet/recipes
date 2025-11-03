import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import useragent from 'express-useragent'
import { dataMerger, errorHandler } from 'middlewares'
import { apiRouter } from 'routers'

dotenv.config()
const { SERVER_PORT } = process.env

const app = express()

app.use(cors())
app.use(useragent.express())
app.use(cookieParser())
app.use(express.json())
app.use(dataMerger)
app.use('/', apiRouter)
app.use(errorHandler)

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
