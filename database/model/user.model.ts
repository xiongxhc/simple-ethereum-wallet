import { Sequelize, DataTypes, UUID, UUIDV4 } from "sequelize";
import { memorySequelize } from "../sequelize";

export const USER_TABLE = memorySequelize.define("users", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.CHAR(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.CHAR(255),
    allowNull: false,
  },
  eth_address: {
    type: DataTypes.CHAR(255),
    allowNull: false,
  },
  created_on: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
});
