import { IUser } from '../models/users.entity'
import { Pool } from 'pg'
import { ConfigService } from "../config/config.service";

export class UsersService {
    private readonly pool: Pool

    constructor() {
        this.pool = new ConfigService().getDB()
    }

    async getUsers(): Promise<IUser[] | undefined> {
        try {
            const { rows } = await this.pool.query<IUser>('SELECT id, login, email FROM users')
            return rows.map(el => {
                return {
                    id: el.id,
                    login: el.login,
                    email: el.email
                }
            })
        } catch (e) {
            console.log('Error! Method: getUsers \n' + e)
        }
    }

    async getUserById(id: string): Promise<IUser[] | undefined> {
        try {
            const { rows } = await this.pool.query<IUser>(`SELECT id, login, email FROM users WHERE id = ${id}`)
            return rows.map(el => {
                return {
                    id: el.id,
                    login: el.login,
                    email: el.email
                }
            })
        } catch (e) {
            console.log('Error! Method: getUserById \n' + e)
        }
    }

    async isUserExist(login: string, email: string): Promise<boolean | undefined> {
        try {
            const { rows } = await this.pool.query<IUser>(`SELECT login, email FROM users WHERE login = '${login}' OR email = '${email}'`)
            return rows.length !== 0
        } catch (e) {
            console.log('Error! Method: isUniqueData \n' + e)
        }
    }

    async createUser(login: string, email: string, hash: string): Promise<void> {
        await this.pool.query(`INSERT INTO users (login, email, hash) VALUES ($1, $2, $3)`, [login, email, hash])
    }

    async deleteUser(id: string): Promise<void> {
        await this.pool.query(`DELETE FROM users WHERE id = ${id}`)
    }

    async updateUser(id: string, login: string, email: string): Promise<void> {
        await this.pool.query(`UPDATE users SET login = '${login}', email = '${email}' WHERE id = ${id}`)
    }
}
