import express, {Router} from "express";
import { getallvideo, uploadvideo } from "../controllers/video.js";
import upload from "../lib/multer.js";

const routes: Router = express.Router();

routes.post("/upload", upload.single("file"), uploadvideo);
routes.get("/getall", getallvideo);
export default routes;
