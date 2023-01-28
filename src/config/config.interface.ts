import { Pool } from "pg";
import { DotenvParseOutput } from "dotenv";

export interface IConfig {
  getDB(): Pool
}