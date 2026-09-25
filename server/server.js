import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { sendTelegramMessage } from "./telegram.js";
import {
  sanitizeDate,
  sanitizeTime,
  sanitizePlace
} from "./validation.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "10kb" }));

app.use(
  express.static(
    path.join(__dirname, "..", "public")
  )
);

/*
|--------------------------------------------------------------------------
| Health check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "date-invitation"
  });
});

/*
|--------------------------------------------------------------------------
| Submit date
|--------------------------------------------------------------------------
*/

app.post("/api/date", async (req, res) => {
  try {
    const place = sanitizePlace(req.body?.place);
    const date = sanitizeDate(req.body?.date);
    const time = sanitizeTime(req.body?.time);

    if (!place || !date || !time) {
      return res.status(400).json({
        ok: false,
        error: "Please provide a valid place, date and time."
      });
    }

    const readableDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(`${date}T12:00:00`));

    const message = `
💗 <b>YOU GOT A YES.</b>

Someone just accepted the date. 😭

📍 <b>Place</b>
${escapeTelegramHtml(place)}

🗓 <b>Date</b>
${readableDate}

🕐 <b>Time</b>
${escapeTelegramHtml(time)}

✨ <i>Good luck, Romeo.</i>
`.trim();

    await sendTelegramMessage(message);

    console.log(
      `[DATE] ${new Date().toISOString()} | ${place} | ${date} | ${time}`
    );

    return res.json({
      ok: true
    });
  } catch (error) {
    console.error("[DATE ERROR]", error);

    return res.status(500).json({
      ok: false,
      error: "Something went wrong."
    });
  }
});

/*
|--------------------------------------------------------------------------
| SPA fallback
|--------------------------------------------------------------------------
*/

app.get("*splat", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "index.html")
  );
});

/*
|--------------------------------------------------------------------------
| Start
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log("");
  console.log("💗 Date Invitation");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("");
});