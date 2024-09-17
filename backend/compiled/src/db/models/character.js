"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterModel = void 0;
const sequelize_1 = require("sequelize");
const service_1 = require("../service");
class Character extends sequelize_1.Model {
}
const characterModel = service_1.sequelize.define("Characters", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
    },
    species: {
        type: sequelize_1.DataTypes.STRING,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
    },
    origin: {
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
    },
    favorite: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
});
exports.characterModel = characterModel;
