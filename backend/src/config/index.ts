import { config } from "dotenv"
config()

interface Config {
  db: {
    database: string | undefined,
    username: string | undefined,
    password: string | undefined,
  },
  redis: {
    host: string | undefined,
    port: string | undefined,
    username: string | undefined,
    password: string | undefined,
  }
}

export const conf:Config = {
  db: {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
  }
}