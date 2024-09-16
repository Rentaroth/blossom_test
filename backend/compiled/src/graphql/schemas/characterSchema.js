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
exports.characterRoot = exports.characterSchema = void 0;
const graphql_1 = require("graphql");
const character_1 = require("../../db/models/character");
const redis_1 = require("../../db/redis");
const decorators_1 = require("../../utils/decorators");
const sequelize_1 = require("sequelize");
const characterSchema = (0, graphql_1.buildSchema)(`
  type Character {
    id: ID
    name: String
    status: String
    species: String
    type: String
    gender: String
    image: String
    favorite: Boolean
    origin: String
  }

  type Query {
    getCharacterById(id: ID!): Character
    getCharacters(order:String): [Character]
    getCharactersFiltered(name: String, status: String, species: String, type: String, gender: String, image: String, favorite: Boolean, origin: String): [Character]
    searchQuery(keyword: String!): [Character]
  }

  type Mutation {
    favoriteOne(id:ID!): Character
    unfavoriteOne(id:ID!): Character
  }
`);
exports.characterSchema = characterSchema;
const characterRoot = {
    getCharacterById: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
        const result = yield character_1.characterModel.findOne({ where: { id } });
        return result;
    }),
    getCharacters: (_a) => __awaiter(void 0, [_a], void 0, function* ({ order }) {
        if (order) {
            const result = yield character_1.characterModel.findAll({
                order: [
                    ['name', `${order}`]
                ]
            });
            return result;
        }
        const result = yield character_1.characterModel.findAll();
        return result;
    }),
    getCharactersFiltered: (0, decorators_1.timeExecution)((args) => __awaiter(void 0, void 0, void 0, function* () {
        const redis = yield (0, redis_1.redisConnection)();
        const response = yield redis.get(JSON.stringify(args));
        if (response) {
            console.log(response);
            return JSON.parse(response);
        }
        const result = yield character_1.characterModel.findAll({ where: args });
        yield redis.set(JSON.stringify(args), JSON.stringify(result));
        return result;
    })),
    searchQuery: (_a) => __awaiter(void 0, [_a], void 0, function* ({ keyword }) {
        const searchString = `%${keyword}%`;
        const result = yield character_1.characterModel.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { name: { [sequelize_1.Op.like]: searchString } },
                    { status: { [sequelize_1.Op.like]: searchString } },
                    { species: { [sequelize_1.Op.like]: searchString } },
                    { type: { [sequelize_1.Op.like]: searchString } },
                    { gender: { [sequelize_1.Op.like]: searchString } },
                ]
            }
        });
        return result;
    }),
    favoriteOne: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
        yield character_1.characterModel.update({ favorite: 1 }, { where: { id } });
        const resultOne = yield character_1.characterModel.findOne({ where: { id } });
        return resultOne;
    }),
    unfavoriteOne: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
        yield character_1.characterModel.update({ favorite: 0 }, { where: { id } });
        const resultOne = yield character_1.characterModel.findOne({ where: { id } });
        return resultOne;
    }),
};
exports.characterRoot = characterRoot;
