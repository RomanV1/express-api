import { describe, it, expect, } from '@jest/globals'
import { Server } from "../app";
import request from 'supertest'

const server = new Server()

describe('getUsers', () => {
    it('should return all users with 200 status code', async () => {
        const res = await request(server.app).get('/users')
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })
})

describe('getUsersById', () => {
    it('should return user with 200 status code', async () => {
        const res = await request(server.app).get('/users/1')
        expect(res.statusCode).toBe(200)
    })

    it('should return 404 User is not found', async () => {
        const res = await request(server.app).get('/users/10000000000000')
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({ error: 'User is not found' })
    })

    it('should return 400 Bad Request', async () => {
        const res = await request(server.app).get('/users/asd')
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({ error: 'Bad Request' })
    })
})

describe('createUser', () => {
    it('should create users with 200 status code', async () => {
        const res = await request(server.app).post('/users')
            .send({
                login: 'user',
                email: 'user@gmail.com',
                password: '123123123'
            })
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({ message: 'User is already exist. Change your login or email' })
    })
})