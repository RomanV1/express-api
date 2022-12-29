import { Request, Response } from 'express'
import { UserService } from '../services/users.service'
import { IUser } from '../models/users.entity'
import { RequestWithBody, RequestWithParams } from '../models/typedRequests'
import { IUserBody } from '../models/users.interface'

class UsersController {
    async getUsers(req: Request, res: Response) {
        try {
            const users: IUser[] | undefined = await new UserService().getUsers()
            if (users && users.length === 0) {
                res.status(404).json({ error: 'Users is not found' })
                return
            }
            res.status(200).send(users)
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: "Server's error" })
        }
    }

    async getUserById(req: RequestWithParams<{ id: string }>, res: Response) {
        try {
            const { id } = req.params
            const user: IUser[] | undefined = await new UserService().getUserById(id)
            if (user && user.length === 0) {
                res.status(404).json({ error: 'User is not found' })
                return
            }
            res.status(200).send(user)
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: "Server's error" })
        }
    }

    async createUser(req: RequestWithBody<IUserBody>, res: Response): Promise<void> {
        try {
            const { login, email, password } = req.body

            const isUniqueData: boolean | undefined = await new UserService().isUniqueData(login, email)
            console.log(isUniqueData)
            if (!isUniqueData && isUniqueData !== undefined) {
                res.status(300).json({ message: 'User is already exist. Change your login or email' })
                return
            }
            if (isUniqueData === undefined) {
                res.status(400).json({ error: 'Bad Request' })
                return
            }

            await new UserService()
                .createUser(login, email, password)
                .then(() => {
                    return res.status(201).json({ message: 'User has been created' })
                })
                .catch((e) => {
                    console.log(e)
                    return res.status(400).json({ error: 'Bad Request' })
                })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: "Server's error" })
        }
    }
}

export default new UsersController()
