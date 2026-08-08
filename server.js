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

    // Load English stories for now
    const filePath = path.join(__dirname, "stories", "english.json");

    const stories = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    // Find a story matching age and theme
    let selectedStory = stories.find(
      (story) =>
        story.age == age &&
        story.theme.toLowerCase() == theme.toLowerCase()
    );

    // If no matching story is found, use the first story
    if (!selectedStory) {
      selectedStory = stories[0];
    }

    // Send story back to FlutterFlow
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
