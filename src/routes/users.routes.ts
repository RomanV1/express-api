import express, { Request } from "express";
import { UsersController } from '../controllers/users.controller'
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from '../models/typedRequests'
import { IUserBody } from '../models/user.interface'

export const router = express.Router()
const usersController = new UsersController()

router.get('/', (req: Request, res) => usersController.getUsers(req, res))
router.get('/:id', (req: RequestWithParams<{ id: string }>, res) => usersController.getUserById(req, res))
router.post('/', (req: RequestWithBody<IUserBody>, res) => usersController.createUser(req, res))
router.put('/:id', (req: RequestWithParamsAndBody<{ id: string }, IUserBody>, res) => usersController.updateUser(req, res))
router.delete('/:id', (req: RequestWithParams<{ id: string }>, res) => usersController.deleteUser(req, res))

