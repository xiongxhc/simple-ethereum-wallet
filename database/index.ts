import { Sequelize, Dialect } from "sequelize";
import { databseConfig } from "../config/database.config";
import { User } from "./model/user.model";

const sequelize = new Sequelize(
  databseConfig.database,
  databseConfig.username,
  databseConfig.password,
  {
    host: databseConfig.host,
    dialect: databseConfig.dialect as Dialect,
  }
);

export const database = {
  sequelize,
  Sequelize,
  User,
};
