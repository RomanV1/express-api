import {RowDataPacket} from "mysql2/typings/mysql/lib/protocol/packets";

export interface IUser extends RowDataPacket {
    id: number,
    login: string,
    email: string
}
