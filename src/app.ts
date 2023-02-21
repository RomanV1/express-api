import express, { Application } from 'express'
import { router } from "./routes";

export class Server {
    public app: Application
    private readonly port: number;

    constructor() {
        this.app = express()
        this.port = 8000

        this.app.use(express.static('src'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(router)
    }

    run() {
        this.app.listen(this.port, (): void => {
            console.log('\x1b[35m%s\x1b[0m', `[server] running... \n[port] ${this.port}`)
        })
    }
}

const server = new Server()
server.run()