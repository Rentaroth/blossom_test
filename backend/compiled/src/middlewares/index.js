"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqInfo = void 0;
const reqInfo = (req, res, next) => {
    console.log(JSON.stringify({ headers: req.rawHeaders, body: req.hostname }));
    return next();
};
exports.reqInfo = reqInfo;
