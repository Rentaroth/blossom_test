import { Router } from "express";
import {
  characterSchema,
  characterRoot,
} from "./src/graphql/schemas/characterSchema";
import { createHandler } from "graphql-http/lib/use/express";
import { reqInfo, cacheStep } from "./src/middlewares";

const router: Router = Router();

export default (): Router => {
  router.use(
    "/characters",
    reqInfo,
    cacheStep,
    createHandler({
      schema: characterSchema,
      rootValue: characterRoot,
    })
  );

  return router;
};
