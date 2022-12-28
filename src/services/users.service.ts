import pool from "./dbConfig";
import { IUser } from "../models/users.entity";

export class UserService {
    async getUsers(): Promise<IUser[]> {
        const { rows } = await pool.query<IUser[]>("SELECT id, login, email FROM users");
        return rows[0]
    }

    async getUserById(id: string): Promise<IUser[]> {
        const { rows } = await pool.query<IUser[]>(`SELECT id, login, email FROM users WHERE id = ${id}`);
        return rows[0]
    }
}
