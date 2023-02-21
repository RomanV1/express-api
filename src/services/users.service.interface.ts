import { IUser } from "../models/user.entity";

export interface IUsersService {
    getUsers(): Promise<IUser[]>
    getUserById(id: string): Promise<IUser[]>
    isUserExist(login: string, email: string): Promise<boolean>
    createUser(login: string, email: string, hash: string): Promise<void>
    deleteUser(id: string): Promise<void>
    updateUser(id: string, login: string, email: string): Promise<void>
}