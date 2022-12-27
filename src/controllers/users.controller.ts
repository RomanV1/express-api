import { Request, Response } from "express";
import { UserService } from "../services/users.service";
import {IUser} from "../models/users.entity";

class UsersController {
    async getUsers(req: Request, res: Response) {
        const users: IUser[] = await new UserService().getUsers();
        res.status(200).send(users);
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        const users = await new UserService().getUserById(id);
        res.status(200).send(users);
    }
}

export default new UsersController();