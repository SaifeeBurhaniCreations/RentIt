const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const RefreshTokenSchema = sequelize.define("RefreshToken", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    field: "user_id", 
    references: {
      model: "User.users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: "expires_at", 
  },
},  {
  modelName: "RefreshToken",
  tableName: "refresh_tokens",
  underscored: true, 
});

module.exports = RefreshTokenSchema;
