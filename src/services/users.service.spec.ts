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
        on: jest.fn(),
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

    it('should be called 1 times with correct query', async () => {
        await new UsersService().getUsers()
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith('SELECT id, login, email FROM users')
    })
})

describe('getUsersById', () => {
    let pool: Pool
    let id = '1'

    beforeEach(() => {
        pool = new Pool()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be called 1 times with correct query', async () => {
        await new UsersService().getUserById(id)
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith(`SELECT id, login, email FROM users WHERE id = ${id}`)
    })
})

describe('isUserExist', () => {
    let pool: Pool
    let login = 'roman'
    let email = 'roman@yandex.ru'

    beforeEach(() => {
        pool = new Pool()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be called 1 times with correct query', async () => {
        await new UsersService().isUserExist(login, email)
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith(`SELECT login, email FROM users WHERE login = '${login}' OR email = '${email}'`)
    })
})

describe('createUser', () => {
    let pool: Pool
    let login = 'roman'
    let email = 'roman@yandex.ru'
    let hash = '123asd123awsd'

    beforeEach(() => {
        pool = new Pool()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be called 1 times with correct query', async () => {
        await new UsersService().createUser(login, email, hash)
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith(`INSERT INTO users (login, email, hash) VALUES ($1, $2, $3)`, [login, email, hash])
    })
})

describe('deleteUser', () => {
    let pool: Pool
    let id = '1'

    beforeEach(() => {
        pool = new Pool()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be called 1 times with correct query', async () => {
        await new UsersService().deleteUser(id)
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith(`DELETE FROM users WHERE id = ${id}`)
    })
})

describe('updateUser', () => {
    let pool: Pool
    let id = '1'
    let login = 'roman'
    let email = 'roman@yandex.ru'

    beforeEach(() => {
        pool = new Pool()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be called 1 times with correct query', async () => {
        await new UsersService().updateUser(id, login, email)
        expect(pool.query).toBeCalledTimes(1)
        expect(pool.query).toBeCalledWith(`UPDATE users SET login = '${login}', email = '${email}' WHERE id = ${id}`)
    })
})
