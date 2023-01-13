import { Request, Response } from 'express'
import { UsersService } from '../services/users.service'
import { IUser } from '../models/users.entity'
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from '../models/typedRequests'
import { IUserBody } from '../models/users.interface'

export class UsersController {
    private usersService: UsersService

    constructor() {
        this.usersService = new UsersService()
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users: IUser[] | undefined = await this.usersService.getUsers()
            if (users && users.length === 0) {
                res.status(404).json({ error: 'Users is not found' })
                return
            }

            res.status(200).send(users)
        } catch (e) {
            res.status(500).json({ error: "Server's error" })
            console.log('Error! Method: getUsers \n' + e)
        }
    }

    async getUserById(req: RequestWithParams<{ id: string }>, res: Response) {
        try {
            const { id } = req.params
            if (!Number(id)) {
                res.status(400).json({ error: 'Bad Request' })
                return
            }

            const user: IUser[] | undefined = await this.usersService.getUserById(id)
            if (user && user.length === 0) {
                res.status(404).json({ error: 'User is not found' })
                return
            }

            res.status(200).send(user)
        } catch (e) {
            res.status(500).json({ error: "Server's error" })
            console.log('Error! Method: getUserById \n' + e)
        }
    }

    async createUser(req: RequestWithBody<IUserBody>, res: Response): Promise<void> {
        try {
            const { login, email, password } = req.body
            if (typeof login === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined') {
                res.status(400).json({ error: 'Bad Request' })
                return
            }

            const isUserExist: boolean | undefined = await this.usersService.isUserExist(login, email)
            if (isUserExist && typeof isUserExist !== 'undefined') {
                res.status(400).json({ message: 'User is already exist. Change your login or email' })
                return
            }
            if (typeof isUserExist === 'undefined') {
                res.status(500).json({ error: "Server's error" })
                return
            }

            await this.usersService
                .createUser(login, email, password)
                .then(() => {
                    res.status(201).json({ message: 'User has been created' })
                    return
                })
                .catch((e) => {
                    console.log(e)
                    res.status(500).json({ error: "Server's error" })
                    return
                })
        } catch (e) {
            res.status(500).json({ error: "Server's error" })
            console.log('Error! Method: createUser \n' + e)
        }
    }

    async deleteUser(req: RequestWithParams<{ id: string }>, res: Response) {
        const { id } = req.params
        if (!Number(id)) {
            res.status(400).json({ error: 'Bad request' })
            return
        }

        const user: IUser[] | undefined = await this.usersService.getUserById(id)
        if (user?.length === 0) {
            res.status(400).json({ error: 'User deleted or not found' })
            return
        }

        await this.usersService
            .deleteUser(id)
            .then(() => {
                res.status(201).json({ message: 'User has been deleted' })
                return
            })
            .catch((e) => {
                console.log(e)
                res.status(500).json({ error: "Server's error" })
                return
            })
    }

    async updateUser(req: RequestWithParamsAndBody<{ id: string }, IUserBody>, res: Response) {
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

        const user: IUser[] | undefined = await this.usersService.getUserById(id)
        if (user?.length === 0) {
            res.status(400).json({ message: "User doesn't exist" })
            return
        }
        if (typeof user === 'undefined') {
            res.status(500).json({ error: "Server's error" })
            return
        }

        await this.usersService
            .updateUser(id, login, email)
            .then(() => {
                res.status(201).json({ message: 'User has been updated' })
                return
            })
            .catch((e) => {
                console.log(e)
                res.status(500).json({ error: "Server's error" })
                return
            })
    }
}
