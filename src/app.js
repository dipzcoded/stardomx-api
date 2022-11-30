import express from "express";
import * as dotenv from "dotenv";
import { errorHandler } from "./middlewares/index.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/users", userRoutes);

app.all("*", (req, res) => {
  res.status(404);
  throw new Error("route not found!");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app running on port:${PORT}`);
});
