import { describe, jest, it, beforeEach, afterEach, expect } from '@jest/globals'
import { Pool } from 'pg'
import { UsersService } from './users.service'

jest.mock('pg', () => {
    const mPool = {
        connect: function () {
            return { query: jest.fn() }
        },
        query: jest.fn(),
        end: jest.fn(),
        on: jest.fn()
    }
    return { Pool: jest.fn(() => mPool) }
})

describe('getUsers', () => {
    let pool: Pool
    beforeEach(() => {
        pool = new Pool()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be called 1 times with params', async () => {
        await new UsersService().getUsers()
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith('SELECT id, login, email FROM users')
        expect(pool.query)
    })

    it('getUserById', async () => {
        await new UsersService().getUsers()
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith('SELECT id, login, email FROM users WHERE id = ${id}')
        expect(pool.query)
    })

    it('createUser', async () => {
        await new UsersService().getUsers()
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith('INSERT INTO users (login, email, hash) VALUES ($1, $2, $3)')
        expect(pool.query)
    })

    it('isUniqueData', async () => {
        await new UsersService().isUniqueData('roma', 'roma@yandex.ru')
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith('SELECT login, email FROM users WHERE login = "${login}" OR email = "${email}"')
        expect(pool.query)
    })
})

describe('getUsersById', () => {
    let pool: Pool
    beforeEach(() => {
        pool = new Pool()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be called 1 times with params', async () => {
        await new UsersService().getUserById('1')
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith('SELECT id, login, email FROM users WHERE id = 1')
    })

    it('correct id', async () => {
        await new UsersService().getUserById('22')
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith('SELECT id, login, email FROM users WHERE id = 22')
    })

    it('incorrect id', async () => {
        await new UsersService().getUserById('NaN')
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith('SELECT id, login, email FROM users WHERE id = NaN')
    })
})
