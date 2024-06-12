import { Router } from "express";
import { InfoController } from "../../controllers/index.js";

const router = Router();

// Checking api is live
router.get("/info", InfoController.info);

export default router;
