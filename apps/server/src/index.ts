import express from "express";
import cors from "cors";
import { signUpRouter } from "./routes/auth/sign-up";
import { authMiddleWare } from "./middleware/auth-middleware";
import { addRoomRouter } from "./routes/room/add-room";
import { deleteRoomRouter } from "./routes/room/delete-room";
import { generateSummaryRouter } from "./routes/content/generate-summary";
import { generateCardsRouter } from "./routes/content/generate-cards";
import { generateChaptersRouter } from "./routes/content/generate-chapters";

import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/auth/signup", signUpRouter);

app.use("/room/create", authMiddleWare, addRoomRouter);
app.use("/room/delete", authMiddleWare, deleteRoomRouter);
app.use("/generate/summary", authMiddleWare, generateSummaryRouter);
app.use("/generate/cards", authMiddleWare, generateCardsRouter);
app.use("/generate/chapters", authMiddleWare, generateChaptersRouter);

app.get("/", async (_, res) => {
  res.send("Hello from Express in Turborepo 🚀");
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
