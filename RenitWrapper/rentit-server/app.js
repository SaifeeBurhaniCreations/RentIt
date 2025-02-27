const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.SERVER_PORT;
const cors = require("cors");
const routes = require("./config/routes");
const ngrok = require("ngrok")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes)

app.listen(port, async () => {
  console.log(`Server is running on port http://localhost:${port}`);
  try {
    await ngrok.kill();
    const ngrokUrl = await ngrok.connect({
      addr: port,
      region: "us",
      authToken: process.env.NGROK_AUTH_TOKEN,
    });
    console.log(`Ngrok tunnel established at: ${ngrokUrl}`);
  } catch (error) {
    console.error(`Couldn't establish Ngrok tunnel:`, error);
  }
});
