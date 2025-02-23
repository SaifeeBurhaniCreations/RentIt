const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m", // Short-lived
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, REFRESH_TOKEN_SECRET, {
    expiresIn: "3d", // Long-lived
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
