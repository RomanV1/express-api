import express, {Application} from 'express'

// const app = express()
// const port = 8000
import { router } from './routes'
//
// app.use(express.static('src'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(router)
//
// app.listen(port, (): void => {
//     console.log('\x1b[35m%s\x1b[0m', `[server] running... \n[port] ${port}`)
// })

class Server {
    private app: Application
    private readonly port: number;

    constructor() {
        this.app = express()
        this.port = 8000

        this.app.use(express.static('src'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(router)
    }

    start() {
        this.app.listen(this.port, (): void => {
            console.log('\x1b[35m%s\x1b[0m', `[server] running... \n[port] ${this.port}`)
        })
    }
}

const server = new Server()
server.start()