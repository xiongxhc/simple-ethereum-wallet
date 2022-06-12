import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize('sqlite::memory:');

export const User = sequelize.define('User', {
  uid: {
    type: DataTypes.UUIDV4,
    allowNull: false
  },
  username: {
    type: DataTypes.CHAR(50),
    allowNull: false
  },
  password: {
    type: DataTypes.CHAR(50),
    allowNull: false
  },
  eth_address: {
    type: DataTypes.CHAR(255),
    allowNull: false
  },
  created_on: {
    type: DataTypes.DATE,
    allowNull: false
  }
});