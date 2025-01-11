const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes.js");
const messageRoutes = require("./routes/messages.routes.js");
const { app, server } = require("../libs/socket.js");
const path = require("path");
const __dirname = path.resolve();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
