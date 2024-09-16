import { buildSchema } from "graphql";
import { characterModel } from "../../db/models/character";
import { redisConnection } from "../../db/redis";
import { timeExecution } from "../../utils/decorators";
import { Op } from "sequelize";


// Graphql schema for characters
const characterSchema = buildSchema(`
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

// HTTP methods CRUD
const characterRoot = {
  getCharacterById: async ({ id }: { id: string }) => {
    const result = await characterModel.findOne({ where: { id } });
    return result;
    // const response = await axios.get(`${API_URL}/character/${id}`);
    // return response.data;
  },
  getCharacters: async ({order}: { order: 'ASC'|'DESC' }) => {
    if (order) {
      const result = await characterModel.findAll({
        order:[
          ['name', `${order}`]
        ]
      });
      return result;
    }
    const result = await characterModel.findAll();
    return result;
    // const response = await axios.get(`${API_URL}/character`);
    // return response.data.results;
  },

  getCharactersFiltered: timeExecution(async (args:any) => {
    const redis = await redisConnection();
    const response = await redis.get(JSON.stringify(args));
    if (response) {
      console.log(response)
      return JSON.parse(response);
    }
    const result = await characterModel.findAll({ where: args});
    await redis.set(JSON.stringify(args), JSON.stringify(result));
    return result;
    // const response = await axios.get(`${API_URL}/character`);
    // return response.data.results;
  }),

  searchQuery: async ({ keyword }: { keyword: string }) => {
    const searchString = `%${keyword}%`;

    const result = await characterModel.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: searchString } },
          { status: { [Op.like]: searchString } },
          { species: { [Op.like]: searchString } },
          { type: { [Op.like]: searchString } },
          { gender: { [Op.like]: searchString } },
        ]
      }
    });
    return result;
    // const response = await axios.get(`${API_URL}/character`);
    // return response.data.results;
  },

  favoriteOne: async ({ id }: { id: string }) => {
    await characterModel.update({ favorite: 1 }, { where: {id}});
    const resultOne = await characterModel.findOne({ where: { id } });
    return resultOne;
    // const response = await axios.get(`${API_URL}/character/${id}`);
    // return response.data;
  },
  unfavoriteOne: async ({ id }: { id: string }) => {
    await characterModel.update({ favorite: 0 }, { where: {id}});
    const resultOne = await characterModel.findOne({ where: { id } });
    return resultOne;
    // const response = await axios.get(`${API_URL}/character/${id}`);
    // return response.data;
  },
};

export { characterSchema, characterRoot };
