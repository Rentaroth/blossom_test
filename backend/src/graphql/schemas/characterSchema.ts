import { buildSchema } from "graphql";
const characterModel = require("../../db/models/character.js");
import { DataTypes } from "sequelize";
import { sequelize } from "../../db/service";

const model = characterModel(sequelize, DataTypes);

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
    getCharacter(id: ID!): Character
    getCharacters: [Character]
  }
`);

// HTTP methods CRUD
const characterRoot = {
  getCharacter: async ({ id }: { id: string }) => {
    console.log("Query!");
    const result = await model.findOne({ where: { id } });
    return result;
    // const response = await axios.get(`${API_URL}/character/${id}`);
    // return response.data;
  },
  getCharacters: async () => {
    console.log("All!");
    const result = await model.findAll();
    return result;
    // const response = await axios.get(`${API_URL}/character`);
    // return response.data.results;
  },
};

export { characterSchema, characterRoot };
