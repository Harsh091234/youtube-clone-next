import express, { Router } from "express";
import {
  deletecomment,
  getallcomment,
  postcomment,
  editcomment,
  dislikeComment,
  likeComment,
  translateComment,
} from "../controllers/comment.js";

const routes: Router = express.Router();
routes.get("/:videoid", getallcomment);
routes.post("/postcomment", postcomment);
routes.delete("/deletecomment/:id", deletecomment);
routes.post("/editcomment/:id", editcomment);
routes.put("/likecomment/:id", likeComment);
routes.put("/dislikecomment/:id", dislikeComment);

routes.post("/translate", translateComment);

export default routes;
