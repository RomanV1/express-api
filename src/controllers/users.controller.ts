import { Request, Response } from 'express'
import { UsersService } from '../services/users.service'
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from '../models/typedRequests'
import { IUserBody } from '../models/user.interface'
import { IUsersController } from "./users.controller.interface";
import { IUsersService } from "../services/users.service.interface";

export class UsersController implements IUsersController {
    private usersService: IUsersService

    constructor() {
        this.usersService = new UsersService()
    }

    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.usersService.getUsers()
            if (users && users.length === 0) {
                res.status(404).json({ error: 'Users is not found' })
                return
            }

            res.status(200).send(users)
        } catch (e) {
            res.status(500).json({ error: "Server's error" })
            console.log('Error! Method: getUsers \n', e)
        }
    }

    async getUserById(req: RequestWithParams<{ id: string }>, res: Response): Promise<void> {
        try {
            const { id } = req.params
            if (!Number(id)) {
                res.status(400).json({ error: 'Bad Request' })
                return
            }

            const user = await this.usersService.getUserById(id)
            if (user?.length === 0) {
                res.status(404).json({ error: 'User is not found' })
                return
            }

            res.status(200).send(user)
        } catch (e) {
            res.status(500).json({ error: "Server's error" })
            console.log('Error! Method: getUserById \n', e)
        }
    }

    async createUser(req: RequestWithBody<IUserBody>, res: Response): Promise<void> {
        try {
            const { login, email, password } = req.body
            if (typeof login === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined') {
                res.status(400).json({ error: 'Bad Request' })
                return
            }

            const isUserExist = await this.usersService.isUserExist(login, email)
            if (isUserExist && typeof isUserExist !== 'undefined') {
                res.status(409).json({ error: 'User is already exist. Change your login or email' })
                return
            }

            await this.usersService.createUser(login, email, password)
            res.status(201).json({ message: 'User has been created' })
        } catch (e) {
            res.status(500).json({ error: "Server's error" })
            console.log('Error! Method: createUser \n', e)
        }
    }

    async deleteUser(req: RequestWithParams<{ id: string }>, res: Response): Promise<void> {
        try {
            const { id } = req.params
            if (!Number(id)) {
                res.status(400).json({ error: 'Bad request' })
                return
            }

            const user = await this.usersService.getUserById(id)
            if (user?.length === 0) {
                res.status(404).json({ error: 'User is not found' })
                return
            }

            await this.usersService.deleteUser(id)
            res.status(201).json({ message: 'User has been created' })
        } catch(e) {
            res.status(500).json({ error: "Server's error" })
            console.log('Error! Method: deleteUser \n', e)
        }
    }

    async updateUser(req: RequestWithParamsAndBody<{ id: string }, IUserBody>, res: Response): Promise<void> {
        try {
            const { id } = req.params
            if (!Number(id)) {
                res.status(400).json({ error: 'Bad request' })
                return
            }

            const { login, email } = req.body
            if (typeof login === 'undefined' || typeof email === 'undefined') {
                res.status(400).json({ error: 'Bad request' })
                return
            }

            const user = await this.usersService.getUserById(id)
            if (user?.length === 0) {
                res.status(409).json({ error: "User doesn't exist" })
                return
            }

            await this.usersService.updateUser(id, login, email)
            res.status(201).json({ message: 'User has been created' })
        } catch(e) {
            res.status(500).json({ error: "Server's error" })
            console.log('Error! Method: updateUser \n', e)
        }
    }
}
