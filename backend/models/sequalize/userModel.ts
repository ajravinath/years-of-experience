import { DataTypes, Model, Optional, Sequelize } from "sequelize";

type UserAttributes = {
  id: string;
  email: string;
  password: string;
};

const User = (sequalize: Sequelize) =>
  sequalize.define<Model<UserAttributes, Optional<UserAttributes, "id">>>(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }
  );

export default User;
