"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const service_1 = require("./src/db/service");
server_1.app.listen(3000, () => {
    console.log("[server]: Listening on port 3000");
    (0, service_1.testConnection)(service_1.sequelize);
});
