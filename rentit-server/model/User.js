const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const UserSchema = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userType: {
      type: Sequelize.ENUM("tenant", "landlord", "agent"),
      allowNull: false,
      field: "user_type",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      field: "updated_at",
    },
  },
  {
    tableName: "users",
    schema: "User",
    underscored: true,
  }
);


UserSchema.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

UserSchema.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = UserSchema;
