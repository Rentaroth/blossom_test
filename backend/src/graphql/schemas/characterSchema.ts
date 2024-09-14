import { buildSchema } from "graphql";
import { characterModel } from "../../db/models/character";
import { redisConnection } from "../../db/redis";
import { timeExecution } from "../../utils/decorators";
import chalk from "chalk";


// Graphql schema for characters
const characterSchema = buildSchema(`
  type Character {
    id: ID
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: String
  }

  type Query {
    getCharacterById(id: ID!): Character
    getCharacters: [Character]
    getCharactersFiltered(name: String, status: String, species: String, type: String, gender: String, origin: String): [Character]
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
  getCharacters: async () => {
    const result = await characterModel.findAll();
    return result;
    // const response = await axios.get(`${API_URL}/character`);
    // return response.data.results;
  },

  getCharactersFiltered: timeExecution(async (args:any) => {
    const redis = await redisConnection();
    const response = await redis.get(JSON.stringify(args));
    if (response) {
      console.log(chalk.bgGray.magenta.bold(response))
      return JSON.parse(response);
    }
    const result = await characterModel.findAll({ where: args});
    await redis.set(JSON.stringify(args), JSON.stringify(result));
    return result;
    // const response = await axios.get(`${API_URL}/character`);
    // return response.data.results;
  }),
};

export { characterSchema, characterRoot };
