import { IUsersService } from './users.service.interface'
import { PrismaClient, User } from '@prisma/client'

export class UsersService implements IUsersService {
    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getUsers(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    async getUserById(id: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                id: Number(id),
            },
        })
    }

    async isUserExist(login: string, email: string): Promise<boolean> {
        const user = await this.prisma.user.findFirst({
            where: {
                login: login,
                email: email,
            },
        })
        return user !== null
    }

    async createUser(login: string, email: string, hash: string): Promise<void> {
        await this.prisma.user.create({
            data: {
                login: login,
                email: email,
                hash: hash,
            },
        })
    }

    async deleteUser(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: Number(id),
            },
        })
    }

    async updateUser(id: string, login: string, email: string): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                login: login,
                email: email,
            },
        })
    }
}
