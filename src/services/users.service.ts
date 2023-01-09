import { IUser } from '../models/users.entity'
import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

export class UsersService {
    private pool: Pool
    constructor() {
        this.pool = new Pool({
            host: process.env.PG_HOST,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            idleTimeoutMillis: 3000
        })
    }

    async getUsers(): Promise<IUser[] | undefined> {
        try {
            const { rows } = await this.pool.query<IUser>('SELECT id, login, email FROM users')
            return rows
        } catch (e) {
            console.log('Error! Method: getUsers \n' + e)
        }
    }

    async getUserById(id: string): Promise<IUser[] | undefined> {
        try {
            const { rows } = await this.pool.query<IUser>(`SELECT id, login, email FROM users WHERE id = ${id}`)
            return rows
        } catch (e) {
            console.log('Error! Method: getUserById \n' + e)
        }
    }

    async createUser(login: string, email: string, hash: string) {
        await this.pool.query<IUser[]>(`INSERT INTO users (login, email, hash) VALUES ($1, $2, $3)`, [login, email, hash])
    }

    async isUniqueData(login: string, email: string): Promise<boolean | undefined> {
        try {
            const { rows } = await this.pool.query(`SELECT login, email FROM users WHERE login = '${login}' OR email = '${email}'`)
            return rows.length === 0
        } catch (e) {
            console.log('Error! Method: isUniqueData \n' + e)
        }
    }
}
