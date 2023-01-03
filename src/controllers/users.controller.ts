import { Request, Response } from 'express'
import { UsersService } from '../services/users.service'
import { IUser } from '../models/users.entity'
import { RequestWithBody, RequestWithParams } from '../models/typedRequests'
import { IUserBody } from '../models/users.interface'

class UsersController {
    // private usersService: UsersService
    // constructor() {
    //     this.usersService = new UsersService()
    // }
    async getUsers(req: Request, res: Response) {
        try {
            const users: IUser[] | undefined = await new UsersService().getUsers()
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

            const user: IUser[] | undefined = await new UsersService().getUserById(id)
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

            const isUniqueData: boolean | undefined = await new UsersService().isUniqueData(login, email)
            if (!isUniqueData) {
                res.status(400).json({ message: 'User is already exist. Change your login or email' })
                return
            }

            await new UsersService()
                .createUser(login, email, password)
                .then(() => {
                    return res.status(201).json({ message: 'User has been created' })
                })
                .catch((e) => {
                    console.log(e)
                    return res.status(500).json({ error: "Server's error" })
                })
        } catch (e) {
            res.status(500).json({ error: "Server's error" })
            console.log('Error! Method: createUser \n' + e)
        }
    }
}

export default new UsersController()
