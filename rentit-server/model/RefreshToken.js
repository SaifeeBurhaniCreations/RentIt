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
},  {
  tableName: "refresh_tokens",
  schema: "RefreshToken",
  underscored: true, 
});

module.exports = RefreshTokenSchema;
