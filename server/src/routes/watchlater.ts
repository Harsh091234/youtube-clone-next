import express, { Router } from "express";
import {
  getallwatchlater,
  handlewatchlater,
} from "../controllers/watchlater.js";

const routes: Router = express.Router();
routes.get("/:userId", getallwatchlater);
routes.post("/:videoId", handlewatchlater);
export default routes;
