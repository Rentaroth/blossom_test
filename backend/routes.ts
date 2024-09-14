import { Router } from "express";
import {
  characterSchema,
  characterRoot,
} from "./src/graphql/schemas/characterSchema";
import { createHandler } from "graphql-http/lib/use/express";
import { reqInfo } from "./src/middlewares/requestInfo";

const router: Router = Router();

export default (): Router => {
  router.use(
    "/characters",
    reqInfo,
    createHandler({
      schema: characterSchema,
      rootValue: characterRoot,
    })
  );

  return router;
};
