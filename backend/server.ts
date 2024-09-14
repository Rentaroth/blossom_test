import express from "express";
import { Express } from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes";
// import { characterSchema, characterRoot } from "./src/graphql/schemas/characterSchema";
// import { createHandler } from "graphql-http/lib/use/express";

const app: Express = express();

app.use(cors())
app.use(helmet())

app.use(express.json())

app.use(routes())

// app.use('/graphql', createHandler({
//   schema: characterSchema,
//   rootValue: characterRoot,
// }))

export {
  app,
}