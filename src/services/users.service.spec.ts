import { describe, it, expect } from '@jest/globals'
import { UsersService } from "./users.service";

const prisma = jestPrisma.client;

describe('Create User', () => {
    it('should return user', async () => {
        const user = await prisma.user.create({
            data:  {
                login: 'userr',
                email: 'userr@gmail.com',
                hash: '13riofo1inoic1oij13'
            }
        })

        expect(await prisma.user.findFirst({
            where: {
                login: user.login,
            },
        })).toStrictEqual(user)
    })

    it('find user by id', async () => {
        const user = await prisma.user.create({
            data:  {
                login: 'userr',
                email: 'userr@gmail.com',
                hash: '13riofo1inoic1oij13'
            }
        })
        expect(await new UsersService().getUserById(user.id.toString()))
            .toStrictEqual(user)
    })
});