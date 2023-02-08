import { describe, jest, it, beforeEach, afterEach, expect } from '@jest/globals'
import { Server } from "../app";
import request from 'supertest'

describe('getUsers', () => {
    it('should return all users', async () => {
        const server = new Server()
        const res = await request(server.app).get('/users')
            .expect(200)
    })
})