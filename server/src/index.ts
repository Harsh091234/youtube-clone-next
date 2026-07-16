import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import userroutes from "./routes/auth.js";
import videoroutes from "./routes/video.js";
import likeroutes from "./routes/like.js";
// import watchlaterroutes from "./routes/watchlater.js";
import historyrroutes from "./routes/history.js";
// import commentroutes from "./routes/comment.js";
dotenv.config();
const app = express();
import path from "path";
import connectDB from "./db/db.js";
app.use(cors({origin: true, credentials: true}));
app.use(express.json({ limit: "30mb"}));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/uploads", express.static(path.join("uploads")));
app.get("/", (req, res) => {
  res.send("You tube backend is working");
});
connectDB();
app.use(bodyParser.json());
app.use("/api/user", userroutes);
app.use("/api/video", videoroutes);
app.use("/api/like", likeroutes);
// app.use("/api/watch", watchlaterroutes);
app.use("/api/history", historyrroutes);
// app.use("/api/comment", commentroutes);
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

