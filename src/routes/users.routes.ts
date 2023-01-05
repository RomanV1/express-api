import express from 'express'
import { UsersController } from '../controllers/users.controller'
export const router = express.Router()
const usersController = new UsersController()

router.get('/', (req, res) => usersController.getUsers(req, res))
router.get('/:id', (req, res) => usersController.getUserById(req, res))
router.post('/', (req, res) => usersController.createUser(req, res))
// router.put('/', UsersController.createUser)
// router.delete('/', UsersController.createUser)
