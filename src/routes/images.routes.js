import { Router } from "express";
import { getImage, getImages, postImage } from "../controllers/images.controller.js";

const router = Router();

router.get("/imagenes", getImages);
router.post("/imagenes", postImage);
// router.get("/imagenes/:filename", getImage);

export default router;
