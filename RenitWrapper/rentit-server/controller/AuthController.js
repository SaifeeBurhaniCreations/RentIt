const express = require("express");
const refreshTokenClient = require("../model/RefreshToken");
const { generateAccessToken } = require("../helper/token");

const router = express.Router();

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ status: 401, message: "Refresh token is required" });

  const storedToken = await refreshTokenClient.findOne({ where: { token: refreshToken } });
  if (!storedToken) return res.status(403).json({ status: 403, message: "Invalid refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const accessToken = generateAccessToken({ id: decoded.id, username: decoded.username });
    res.status(200).json({ status: 200, accessToken });
  } catch (err) {
    res.status(403).json({ status: 403, message: "Invalid or expired refresh token" });
  }
});


module.exports = router;
