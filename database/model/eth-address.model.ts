import { Sequelize, DataTypes, UUID, UUIDV4 } from "sequelize";
import { memorySequelize } from "../sequelize";

export const ETH_ADDRESS_TABLE = memorySequelize.define("eth_addresses", {
  eth_address: {
    type: DataTypes.CHAR(255),
    allowNull: false,
    primaryKey: true,
  },
  private_key: {
    type: DataTypes.CHAR(255),
    allowNull: false,
  },
});
