import { buildSchema } from "graphql";

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

const characterRoot = {
  getCharacter: async ({ id }: { id: string }) => {
    // const response = await axios.get(`${API_URL}/character/${id}`);
    // return response.data;
  },
  getCharacters: async () => {
    // const response = await axios.get(`${API_URL}/character`);
    // return response.data.results;
  },
};