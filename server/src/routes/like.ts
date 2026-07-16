import express, { Router } from "express";
import { handlelike, getallLikedVideo } from "../controllers/like.js";

const routes: Router = express.Router();
routes.get("/:userId", getallLikedVideo);
routes.post("/:videoId", handlelike);
export default routes;
