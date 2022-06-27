import { Dialect } from "sequelize";

export default {
  HOST: process.env.HOST as string,
  USER: process.env.USER as string,
  PASSWORD: process.env.PASSWORD as string,
  DB: process.env.DB as string,
  dialect: process.env.DIALECT as Dialect,
};
