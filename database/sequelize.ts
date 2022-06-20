import { Sequelize, Dialect } from "sequelize";
import { databseConfig } from "../config/database.config";

export const sequelize = new Sequelize(
  databseConfig.database,
  databseConfig.username,
  databseConfig.password,
  {
    host: databseConfig.host,
    dialect: databseConfig.dialect as Dialect,
  }
);

export const memorySequelize = new Sequelize("sqlite::memory:");
