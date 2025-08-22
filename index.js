const express = require("express");
const ytSearch = require("yt-search");

const app = express();

app.get("/api/ytsearch", async (req, res) => {
  const q = req.query.q; // use q instead of query
  if (!q) return res.status(400).json({ success: false, error: "Missing search query" });

  try {
    const results = await ytSearch(q);
    const video = results.videos[0]; // only first result

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
