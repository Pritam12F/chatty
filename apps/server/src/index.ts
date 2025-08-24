import express from "express";
import { prisma } from "@workspace/db";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (_req, res) => {
  res.send("Hello from Express in Turborepo 🚀");
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
