import { Sequelize, DataTypes, UUID, UUIDV4 } from "sequelize";
const sequelize = new Sequelize("sqlite::memory:");

export const USER_TABLE = sequelize.define("users", {
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
