import dotenv from 'dotenv'
import { Pool } from "pg";
dotenv.config();
export default new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    idleTimeoutMillis: 3000
})
