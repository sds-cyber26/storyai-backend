const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// Home page
app.get("/", (req, res) => {
  res.send("StoryAI Backend is Running");
});

// Story API
app.post("/story", (req, res) => {
  try {
    const theme = req.body.theme;
    const age = req.body.age;
    const language = req.body.language;

    // Select story file based on language
    let fileName;

    if (language === "EN") {
      fileName = "english.json";
    } else if (language === "HI") {
      fileName = "hindi.json";
    } else if (language === "MR") {
      fileName = "marathi.json";
    } else {
      fileName = "english.json";
    }

    // Build file path
    const filePath = path.join(
      __dirname,
      "stories",
      fileName
    );

    // Read stories
    const stories = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    // Find matching story
    let selectedStory = stories.find(
      (story) =>
        story.age == age &&
        story.theme.toLowerCase() == theme.toLowerCase()
    );

    // If exact match is not found, use first story
    if (!selectedStory) {
      selectedStory = stories[0];
    }

    // Return story
    res.json({
      success: true,
      title: selectedStory.title,
      language: language || "EN",
      age: selectedStory.age,
      theme: selectedStory.theme,
      story: selectedStory.story
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
