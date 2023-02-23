import { User } from '@prisma/client'

export interface IUsersService {
    getUsers(): Promise<User[]>

    getUserById(id: string): Promise<User | null>

    isUserExist(login: string, email: string): Promise<boolean>

    createUser(login: string, email: string, hash: string): Promise<void>

    deleteUser(id: string): Promise<void>

    updateUser(id: string, login: string, email: string): Promise<void>
}
