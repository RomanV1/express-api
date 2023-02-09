import { describe, it, expect, } from '@jest/globals'
import { Server } from "../app";
import request from 'supertest'

describe('getUsers', () => {
    it('should return all users with 200 status code', async () => {
        const server = new Server()
        const res = await request(server.app).get('/users')
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })
})

describe('getUsersById', () => {
    it('should return user with 200 status code', async () => {
        const server = new Server()
        const res = await request(server.app).get('/users/1')
        expect(res.statusCode).toBe(200)
    })

    it('should return 404 status code', async () => {
        const server = new Server()
        const res = await request(server.app).get('/users/10000000000000')
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({ error: 'User is not found' })
    })
})