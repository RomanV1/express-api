import { IUser } from '../models/user.entity'
import { Pool } from 'pg'
import { ConfigService } from "../config/config.service";
import { IUsersService } from "./users.service.interface";

export class UsersService implements IUsersService {
    private readonly pool: Pool

    constructor() {
        this.pool = new ConfigService().getDB()
    }

    async getUsers(): Promise<IUser[]> {
        const { rows } = await this.pool.query<IUser>('SELECT id, login, email FROM users')
        return rows.map(el => {
            return {
                id: el.id,
                login: el.login,
                email: el.email
            }
        })
    }

    async getUserById(id: string): Promise<IUser[]> {
        const { rows } = await this.pool.query<IUser>(`SELECT id, login, email FROM users WHERE id = ${id}`)
        return rows.map(el => {
            return {
                id: el.id,
                login: el.login,
                email: el.email
            }
        })
    }

    async isUserExist(login: string, email: string): Promise<boolean> {
        const { rows } = await this.pool.query<IUser>(`SELECT login, email FROM users WHERE login = '${login}' OR email = '${email}'`)
        return rows.length !== 0
    }

    async createUser(login: string, email: string, hash: string): Promise<void> {
        await this.pool.query<IUser>(`INSERT INTO users (login, email, hash) VALUES ($1, $2, $3)`, [login, email, hash])
    }

    async deleteUser(id: string): Promise<void> {
        await this.pool.query<IUser>(`DELETE FROM users WHERE id = ${id}`)
    }

    async updateUser(id: string, login: string, email: string): Promise<void> {
        await this.pool.query<IUser>(`UPDATE users SET login = '${login}', email = '${email}' WHERE id = ${id}`)
    }
}
