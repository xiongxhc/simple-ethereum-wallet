import { sequelize, memorySequelize } from "./sequelize";
import { USER_TABLE } from "./model/user.model";
import { ETH_ADDRESS_TABLE } from "./model/eth-address.model";

export const database = {
  sequelize,
  memorySequelize,
  USER_TABLE,
  ETH_ADDRESS_TABLE,
};
