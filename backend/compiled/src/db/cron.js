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
exports.cronTask = void 0;
const service_1 = require("./service");
const cron = require("node-cron");
const getRandomIds = () => {
    return Math.floor(Math.random() * 826);
};
const cronTask = () => __awaiter(void 0, void 0, void 0, function* () {
    cron.schedule("*/1 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        let chars = "";
        for (let i = 0; i < 15; i++) {
            let id = getRandomIds();
            if (i !== 14) {
                chars = chars + `${id},`;
            }
            else {
                chars = chars + id;
                console.log(chars);
            }
        }
        const newCharacters = yield fetch(`https://rickandmortyapi.com/api/character/${chars}`);
        const response = yield newCharacters.json();
        service_1.sequelize.query("DELETE FROM Characters;");
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        response.forEach((element) => {
            service_1.sequelize.query(`INSERT INTO Characters (name, status, species, type, gender, origin, image, favorite, createdAt, updatedAt) VALUES ("${element.name}", "${element.status}", "${element.species}", "${element.type}", "${element.gender}", "${element.origin.name}", "${element.image}", "0", "${date}", "${date}");`);
        });
        console.log('[server]: Crontask initiated!');
    }), {
        scheduled: true,
        timezone: "America/Bogota",
    });
});
exports.cronTask = cronTask;
