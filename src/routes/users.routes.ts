import express from 'express'
import UsersController from '../controllers/users.controller'

export const router = express.Router()

router.get('/', UsersController.getUsers)
router.get('/:id', UsersController.getUserById)
router.post('/', UsersController.createUser)
// router.put('/', UsersController.createUser)
// router.delete('/', UsersController.createUser)
