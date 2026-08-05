const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    app: "StoryAI Backend",
    status: "Running 🚀"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "StoryAI Backend is healthy"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`StoryAI Backend running on port ${PORT}`);
});
