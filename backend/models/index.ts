import dbConfig from "../config/dbConfig";
import { Sequelize } from "sequelize";
import Profile from "./profileModel";
import Experience from "./experienceModel";

const isProduction = process.env.DB_ENV === "production";
const options = isProduction
  ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
  : {};

const connectionString = `postgresql://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
const sequelize = new Sequelize(
  isProduction ? (process.env.DATABASE_URL as string) : connectionString,
  options
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const profiles = Profile(sequelize);
const experiences = Experience(sequelize);

profiles.hasMany(experiences, {
  foreignKey: "profile_id",
  as: "experience",
});

experiences.belongsTo(profiles, { foreignKey: "profile_id", as: "profile" });

if (isProduction) {
  (async () => {
    try {
      await sequelize.sync({ force: true });
      console.log("tables re-synced");
    } catch (error) {
      console.log("unable to re-synced tables");
    }
  })();
}

export default { profiles, experiences };
