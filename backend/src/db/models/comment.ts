import { Model, DataTypes } from "sequelize";
import { sequelize } from "../service";
import { characterModel } from "./character";

class Comment extends Model {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: string;
  declare characterId: string;
  declare content: string;
}

const commentModel = sequelize.define<Comment>("Comments", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
  },
  characterId: {
    type: DataTypes.UUID,
    references: {
      model: 'Characters',
      key: 'id',
    },
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

commentModel.belongsTo(characterModel)

export { commentModel };
