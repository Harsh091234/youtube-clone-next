import  {Router} from "express";

const { downloadVideo } = require("../controllers/download.js");
const routes: Router = Router();

routes.post("/", downloadVideo);

export default routes;
