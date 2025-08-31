import express from "express";
import cors from "cors";
import { signUpRouter } from "./routes/auth/sign-up";
import { authMiddleWare } from "./middleware/auth-middleware";
import "dotenv/config";
import { addRoomRouter } from "./routes/room/add-room";
import { deleteRoomRouter } from "./routes/room/delete-room";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/auth/signup", signUpRouter);

app.use("/room/create", authMiddleWare, addRoomRouter);
app.use("/room/delete", authMiddleWare, deleteRoomRouter);

app.get("/", async (_req, res) => {
  res.send("Hello from Express in Turborepo 🚀");
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
