import { Sequelize } from "sequelize-typescript";
import { conf } from "../config";
import { cronTask } from "./cron";

const sequelize = new Sequelize(`mysql://${conf.db.username}:${conf.db.password}@localhost:3306/${conf.db.database}`);
const testConnection = async (sequelize:Sequelize) => {
  try {
    await sequelize.authenticate();
    console.log('[server]: Database connected!');
    await cronTask();
  } catch (error) {
    console.error('[server]: Unable to connect to the database:', error);
  }
  return sequelize
}

export { sequelize, testConnection };
