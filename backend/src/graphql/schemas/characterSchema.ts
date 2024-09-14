import { buildSchema } from "graphql";
import { characterModel } from "../../db/models/character";
import { DataTypes } from "sequelize";
import { sequelize } from "../../db/service";


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
  }
`);

interface filterChar {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
  getCharacter(id: string): JSON
}

class filterCharacter implements filterChar {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: string;

  constructor(
    id: string,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: string
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.species = species;
    this.type = type;
    this.gender = gender;
    this.origin = origin;
  }
  getCharacter(id: string):JSON {
    return JSON.parse('{}')
  }
}

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
};

export { characterSchema, characterRoot };
