import { IConfig } from "./config.interface";
import { Pool } from "pg";
import { config, DotenvParseOutput } from "dotenv";

export class ConfigService implements IConfig {
    private readonly config: DotenvParseOutput

    constructor() {
        const { error, parsed } = config()
        if (error) {
            throw new Error('.env is not found')
        }
        if (!parsed) {
            throw new Error('.env is empty')
        }
        this.config = parsed
    }

    getDB(): Pool {
        return new Pool({
            host: this.config['PG_HOST'],
            user: this.config['PG_USER'],
            password: this.config['PG_PASSWORD'],
            database: this.config['PG_DATABASE'],
            idleTimeoutMillis: 3000
        })
    }

}