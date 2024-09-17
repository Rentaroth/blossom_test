"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = void 0;
const sequelize_1 = require("sequelize");
const service_1 = require("../service");
const character_1 = require("./character");
class Comment extends sequelize_1.Model {
}
const commentModel = service_1.sequelize.define("Comments", {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
    },
    characterId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: 'Characters',
            key: 'id',
        },
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
exports.commentModel = commentModel;
commentModel.belongsTo(character_1.characterModel);
