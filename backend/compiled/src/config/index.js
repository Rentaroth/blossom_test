"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conf = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.conf = {
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
};
