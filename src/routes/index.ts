import express from 'express'
import * as usersRoutes from './users.routes'

export const router = express.Router()

router.use('/users', usersRoutes.router)

