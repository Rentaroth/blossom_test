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
exports.commentRoot = exports.commentSchema = void 0;
const graphql_1 = require("graphql");
const comment_1 = require("../../db/models/comment");
const redis_1 = require("../../db/redis");
const decorators_1 = require("../../utils/decorators");
const commentSchema = (0, graphql_1.buildSchema)(`
  type Comment {
    id: ID
    characterId: String
    content: String
    deletedAt: String
  }

  type Query {
    getComment(characterId:String order:String): [Comment]
  }

  input commentInput {
    characterId: String!
    content: String!
  }
  input editInput {
    content: String!
  }

  type Mutation {
    createOne(input: commentInput): Comment
    editOne(id:ID input:editInput): Comment
    deleteOne(id:ID!): Comment
  }
`);
exports.commentSchema = commentSchema;
const commentRoot = {
    getComment: (0, decorators_1.timeExecution)((_a) => __awaiter(void 0, [_a], void 0, function* ({ order }) {
        const redis = yield (0, redis_1.redisConnection)();
        const cached = yield redis.get(`comments:${JSON.stringify(order)}`);
        if (cached) {
            return cached;
        }
        const result = yield comment_1.commentModel.findAll({ order: [
                ['name', `${order}`]
            ] });
        yield redis.set(`comments:${JSON.stringify(order)}`, JSON.stringify(result));
        return result;
    })),
    createOne: (_a) => __awaiter(void 0, [_a], void 0, function* ({ data }) {
        const result = yield comment_1.commentModel.create({ data });
        return result;
    }),
    editOne: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, data }) {
        const result = yield comment_1.commentModel.update(data, { where: { id } });
        return result;
    }),
    deleteOne: (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const result = yield comment_1.commentModel.update({ deletedAt: date }, { where: { id } });
        return result;
    }),
};
exports.commentRoot = commentRoot;
