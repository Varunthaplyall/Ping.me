import { json, urlencoded, static as serveStatic } from "express";
require("dotenv").config();
const PORT = process.env.PORT;
import cors from "cors";
import { connect } from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import { app, server } from "../libs/socket.js";
import { resolve, join } from "path";
const __dirname = resolve();

app.use(cors());
app.use(json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(serveStatic(join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "../client", "dist", "index.html"));
  });
}

connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
