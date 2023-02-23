import { Request, Response } from 'express'
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from '../models/typedRequests'
import { IUserBody } from '../models/user.interface'

export interface IUsersController {
    getUsers(req: Request, res: Response): Promise<void>

    getUserById(req: RequestWithParams<{ id: string }>, res: Response): Promise<void>

    createUser(req: RequestWithBody<IUserBody>, res: Response): Promise<void>

    deleteUser(req: RequestWithParams<{ id: string }>, res: Response): Promise<void>

    updateUser(req: RequestWithParamsAndBody<{ id: string }, IUserBody>, res: Response): Promise<void>
}