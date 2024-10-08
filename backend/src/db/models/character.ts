import { Model, DataTypes } from "sequelize";
import { sequelize } from "../service";
// import { commentModel } from "./comment";

class Character extends Model {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: string;
  declare name: string;
  declare status: string;
  declare species: string;
  declare type: string;
  declare gender: string;
  declare origin: string;
}

const characterModel = sequelize.define<Character>("Characters", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  species: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  origin: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});

// characterModel.hasMany(commentModel);

export { characterModel };
