import { buildSchema } from "graphql";
import { commentModel } from "../../db/models/comment";
import { redisConnection } from "../../db/redis";
import { timeExecution } from "../../utils/decorators";
import { UUID } from "crypto";

// Graphql schema for characters
const commentSchema = buildSchema(`
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
    deletedAt: String
    comment: Comment!
  }
  
  type Comment {
    id: ID
    characterId: Character
    content: String
    deletedAt: String
  }

  type Query {
    getComment(characterId:ID order:String): [Comment]
  }

  input commentInput {
    characterId: ID!
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

// HTTP methods CRUD
const commentRoot = {
  getComment: timeExecution(async ({ order }: { characterId: UUID, order: string }) => {
    const redis = await redisConnection();
    const cached = await redis.get(`comments:${order}`);

    if (cached) {
      return cached;
    }

    const result = await commentModel.findAll({
      order: [["createdAt", `${order}`]],
    });
    await redis.set(
      `comments:${JSON.stringify(order)}`,
      JSON.stringify(result)
    );
    return result;
  }),
  createOne: async ({
    input,
  }: {
    input: { characterId: UUID; content: string };
  }) => {
    const data = {...input};
    console.log(data.characterId, 'Here!');
    const result = await commentModel.create(data, {returning: true})
    .catch(error => console.error(error));
    return result;
  },
  editOne: async ({
    id,
    input,
  }: {
    id: UUID;
    input: { content: string };
  }) => {
    console.log(input.content)
    const result = await commentModel.update(input, { where: { id } });
    return result;
  },
  deleteOne: async ({ id }: { id: string }) => {
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const result = await commentModel.update(
      { deletedAt: date },
      { 
        where: { id },
        returning: true
      },
    );
    return result;
  },
};

export { commentSchema, commentRoot };
