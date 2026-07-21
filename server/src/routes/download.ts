import { Router } from "express";

import { downloadVideo } from "../controllers/download.js";
const routes: Router = Router();

routes.post("/", downloadVideo);

export default routes;
