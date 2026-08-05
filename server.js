const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    app: "StoryAI Backend",
    status: "Running 🚀"
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "StoryAI Backend is healthy"
  });
});

// Story API (Temporary)
app.post("/story", (req, res) => {

  const { theme, age, language } = req.body;

  res.json({
    success: true,
    title: "The Brave Little Rabbit",
    language: language,
    age: age,
    theme: theme,
    story:
      "Once upon a time there lived a brave little rabbit who helped every animal in the forest. Everyone loved him because kindness is the greatest strength."
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`StoryAI Backend running on port ${PORT}`);
});
