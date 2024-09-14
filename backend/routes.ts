import { Router } from "express";
import {
  characterSchema,
  characterRoot,
} from "./src/graphql/schemas/characterSchema";
import { createHandler } from "graphql-http/lib/use/express";

const router: Router = Router();

export default (): Router => {
  router.use(
    "/characters",
    createHandler({
      schema: characterSchema,
      rootValue: characterRoot,
    })
  );

  return router;
};
