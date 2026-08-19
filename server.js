const compression = require("compression"); 
const express = require("express");

const fs = require("fs");
const path = require("path");

const app = express();
app.use(compression());

app.use(express.json());
const storyCache = {};

const PORT = process.env.PORT || 3000;
function getStoryFile(language) {
  switch (language) {
    case "HI":
      return "hindi.json";

    case "MR":
      return "marathi.json";

    default:
      return "english.json";
  }
}

function loadStories(language) {
  const fileName = getStoryFile(language);

  const filePath = path.join(
    __dirname,
    "stories",
    fileName
  );

  if (!storyCache[filePath]) {
    storyCache[filePath] = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );
  }

  return storyCache[filePath];
}

// Home page
app.get("/", (req, res) => {
  res.send("StoryAI Backend is Running");
});

// Story API
app.post("/story", (req, res) => {
  try {
    const language = req.body.language || "EN";
    const storyId = req.body.storyId || 1;

    // Select story file based on language
   const stories = loadStories(language);

    // Find matching story
    // Select the story

const selectedStory =
  stories.find(
    (story) => story.id == storyId
  ) || stories[0];

    // Return story
  res.json({
  success: true,
  id: selectedStory.id,
  title: selectedStory.title,
  language: language || "EN",
  totalPages: selectedStory.totalPages,
  coverImage: selectedStory.coverImage,
  pages: selectedStory.pages
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post("/stories", (req, res) => {
  try {
    const language = req.body.language || "EN";

    const stories = loadStories(language);
    
    const storyList = stories.map(
      (story) => ({
        id: story.id,
        title: story.title,
        totalPages: story.totalPages,
        coverImage: story.coverImage,
        pages: story.pages
      })
    );

    res.json(storyList);
  } catch (error) {
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
