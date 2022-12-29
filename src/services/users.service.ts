import pool from './dbConfig'
import { IUser } from '../models/users.entity'

export class UserService {
    async getUsers(): Promise<IUser[] | undefined> {
        try {
            const { rows } = await pool.query<IUser>('SELECT id, login, email FROM users')
            return rows
        } catch (e) {
            console.log(e)
        }
    }

    async getUserById(id: string): Promise<IUser[] | undefined> {
        try {
            const { rows } = await pool.query<IUser>(`SELECT id, login, email FROM users WHERE id = ${id}`)
            return rows
        } catch (e) {
            console.log(e)
        }
    }

    async createUser(login: string, email: string, hash: string): Promise<void> {
        await pool.query<IUser[]>(`INSERT INTO users (login, email, hash) VALUES ($1, $2, $3)`, [login, email, hash])
    }

    async isUniqueData(login: string, email: string): Promise<boolean | undefined> {
        try {
            if (typeof login === 'undefined' || typeof email === 'undefined') {
                return undefined
            }
            const { rows } = await pool.query(`SELECT login, email FROM users WHERE login = '${login}' OR email = '${email}'`)
            return rows.length === 0
        } catch (e) {
            console.log(e)
        }
    }
}
