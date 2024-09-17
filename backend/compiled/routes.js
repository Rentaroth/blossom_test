"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characterSchema_1 = require("./src/graphql/schemas/characterSchema");
const commentSchema_1 = require("./src/graphql/schemas/commentSchema");
const express_2 = require("graphql-http/lib/use/express");
const middlewares_1 = require("./src/middlewares");
const router = (0, express_1.Router)();
exports.default = () => {
    router.use("/characters", middlewares_1.reqInfo, (0, express_2.createHandler)({
        schema: characterSchema_1.characterSchema,
        rootValue: characterSchema_1.characterRoot,
    }));
    router.use("/comments", middlewares_1.reqInfo, (0, express_2.createHandler)({
        schema: commentSchema_1.commentSchema,
        rootValue: commentSchema_1.commentRoot,
    }));
    return router;
};
