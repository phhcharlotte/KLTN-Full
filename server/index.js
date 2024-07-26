import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import thesisRoutes from "./routes/thesis.js";
import userRoutes from "./routes/user.js";
import notificationRoutes from "./routes/notification.js";
import apiRoutes from "./routes/api.js";
import deadlineRoutes from "./routes/deadline.js";
import statusRoutes from "./routes/studentstatus.js";
import "./cronJobs/checkDeadlines.js";
import morgan from "morgan";

import path from "path";
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(morgan());

// Static folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes

app.use("/deadlines", deadlineRoutes);
app.use("/status", statusRoutes);
app.use("/api", apiRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/theses", thesisRoutes);
app.use("/notifications", notificationRoutes);
//MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
