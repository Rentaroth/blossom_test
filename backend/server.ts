import { Express, Request } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import router from "./routes";

const app: Express = express();

app.use(cors())
app.use(helmet())

app.use(express.json())

app.use(router())



export {
  app,
}