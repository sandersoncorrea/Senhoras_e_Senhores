import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";
import AsilosController from "./controllers/AsilosController";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/asilos", upload.array("images"), AsilosController.create);
routes.get("/asilos/:id", AsilosController.show);
routes.get("/asilos", AsilosController.index);

export default routes;
