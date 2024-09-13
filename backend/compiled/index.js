"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.app.listen(3000, () => {
    console.log("[server]: Listening on port 3000");
});
