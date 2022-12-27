import { pool } from "./connect";
import {IUser} from "../models/users.entity";

export class UserService {
    async getUsers(): Promise<IUser[] | undefined> {
        const [users] = await pool.query<IUser[]>("SELECT id, login, email FROM users");
        return users
    }

    async getUserById(id: string): Promise<IUser[] | undefined> {
        const [users] = await pool.query<IUser[]>(`SELECT id, login, email FROM users WHERE id = ${id}`);
        return users
    }
}
