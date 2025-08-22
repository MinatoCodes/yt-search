// search-single.js
import express from "express";
import ytSearch from "yt-search";

const app = express();

app.get("/api/ytsearch", async (req, res) => {
  const { query } = req.query.q;
  if (!query) return res.status(400).json({ success: false, error: "Missing search query" });

  try {
    const results = await ytSearch(query);
    const video = results.videos[0]; // first result only

    if (!video) {
      return res.json({ success: false, error: "No video found" });
    }

    res.json({
      success: true,
      creator: "Minato",
      title: video.title,
      url: video.url,
      duration: video.timestamp,
      thumbnail: video.image,
      author: video.author.name
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to search YouTube" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`YouTube Search API running on port ${PORT}`));
  
