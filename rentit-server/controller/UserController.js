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
    console.log(user);
    if (!user) return res.status(500).json({ message: "Server Error" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    console.log("accessToken", accessToken)
    console.log("refreshToken", refreshToken)
    await refreshTokenClient.create({
      token: refreshToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userClient.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await refreshTokenClient.create({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
  });

  res.status(200).json({ accessToken, refreshToken });
});

router.post("/token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: "Refresh token is required" });

  const storedToken = await refreshTokenClient.findOne({ where: { token: refreshToken } });
  if (!storedToken) return res.status(403).json({ message: "Invalid refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const accessToken = generateAccessToken({ id: decoded.id, username: decoded.username });
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});

router.post("/logout", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ message: "Refresh token is required" });

  await refreshTokenClient.destroy({ where: { token: refreshToken } });

  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
