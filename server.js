import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const SOURCE = "http://centra.ink/live/Centra_Live_iVIOT/zTsGiHyZ884M/794859.m3u8";

app.get("/stream.m3u8", async (req, res) => {
  const response = await fetch(SOURCE);
  const text = await response.text();
  res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
  res.send(text);
});

app.get("/*.ts", async (req, res) => {
  const segmentUrl = `http://centra.ink/live/Centra_Live_iVIOT/zTsGiHyZ884M/${req.path.split('/').pop()}`;
  const response = await fetch(segmentUrl);
  res.setHeader("Content-Type", "video/mp2t");
  response.body.pipe(res);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
