"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characterSchema_1 = require("./src/graphql/schemas/characterSchema");
const express_2 = require("graphql-http/lib/use/express");
const middlewares_1 = require("./src/middlewares");
const router = (0, express_1.Router)();
exports.default = () => {
    router.use("/characters", middlewares_1.reqInfo, middlewares_1.cacheStep, (0, express_2.createHandler)({
        schema: characterSchema_1.characterSchema,
        rootValue: characterSchema_1.characterRoot,
    }));
    return router;
};
