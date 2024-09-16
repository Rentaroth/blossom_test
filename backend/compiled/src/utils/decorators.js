"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeExecution = timeExecution;
function timeExecution(func) {
    return (...args) => {
        console.time(func.name);
        const result = func.apply(this, args);
        console.timeEnd(func.name);
        return result;
    };
}
