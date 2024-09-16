"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config");
const cron_1 = require("./cron");
const sequelize = new sequelize_typescript_1.Sequelize(`mysql://${config_1.conf.db.username}:${config_1.conf.db.password}@localhost:3306/${config_1.conf.db.database}`);
exports.sequelize = sequelize;
const testConnection = (sequelize) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('[server]: Database connected!');
        yield (0, cron_1.cronTask)();
    }
    catch (error) {
        console.error('[server]: Unable to connect to the database:', error);
    }
    return sequelize;
});
exports.testConnection = testConnection;
