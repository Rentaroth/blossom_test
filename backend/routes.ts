import { Router } from "express";
import {
  characterSchema,
  characterRoot,
} from "./src/graphql/schemas/characterSchema";
import {
  commentSchema,
  commentRoot,
} from "./src/graphql/schemas/commentSchema";
import { createHandler } from "graphql-http/lib/use/express";
import { reqInfo } from "./src/middlewares";

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
  router.use(
    "/comments",
    reqInfo,
    createHandler({
      schema: commentSchema,
      rootValue: commentRoot,
    })
  );

  return router;
};
