import express from 'express'
const app = express()
const port = 8000
import { router } from './routes'

app.use(express.static('src'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(port, (): void => {
    console.log('\x1b[35m%s\x1b[0m', `[server] running... \n[port] ${port}`)
})
