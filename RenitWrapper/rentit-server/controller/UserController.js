const express = require("express");
const bcrypt = require("bcryptjs");
const userClient = require("../model/User");
const refreshTokenClient = require("../model/RefreshToken");
const { generateAccessToken, generateRefreshToken } = require("../helper/token");

const router = express.Router();

router.post("/register", async (req, res) => {
  const payload = req.body;
  
  try {
    const user = await userClient.create(payload);
    if (!user) return res.status(500).json({ status: 500, message: "Server Error" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await refreshTokenClient.create({
      token: refreshToken,
      userId: user.id,  
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({ status: 200, accessToken, refreshToken });
  } catch (error) {
    console.error("Error in register route:", error); 
    res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userClient.findOne({ where: { username } });
  if (!user) return res.status(401).json({ status: 401, message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ status: 401, message: "Invalid credentials" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await refreshTokenClient.create({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
  });

  res.status(200).json({ status: 200, accessToken, refreshToken });
});

router.post("/logout", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ status: 400, message: "Refresh token is required" });

  await refreshTokenClient.destroy({ where: { token: refreshToken } });

  res.status(200).json({ status: 200, message: "Logged out successfully" });
});

module.exports = router;
