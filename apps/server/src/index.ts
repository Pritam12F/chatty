import express from "express";
import cors from "cors";
import { signUpRouter } from "./routes/auth/sign-up";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/auth/signup", signUpRouter);

app.get("/", (_req, res) => {
  res.send("Hello from Express in Turborepo 🚀");
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
