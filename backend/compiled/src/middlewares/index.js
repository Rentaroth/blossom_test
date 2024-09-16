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
exports.cacheStep = exports.reqInfo = void 0;
const redis_1 = require("../db/redis");
const reqInfo = (req, res, next) => {
    console.log(JSON.stringify({ headers: req.rawHeaders, body: req.hostname }));
    return next();
};
exports.reqInfo = reqInfo;
const cacheStep = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const redis = yield (0, redis_1.redisConnection)();
    const cached = yield redis.get(JSON.stringify(req.body));
    console.log(cached);
    if (cached) {
        return cached;
    }
    yield redis.set('cacheBody', JSON.stringify(req.body));
    return next();
});
exports.cacheStep = cacheStep;
