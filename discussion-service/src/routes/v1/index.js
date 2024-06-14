import { Router } from "express";
import authRoutes from "./discussion-routes.js";
import { InfoController } from "../../controllers/index.js";

const router = Router();

// discussions routes

router.use("/discussions", authRoutes);

// Checking api is live
router.get("/info", InfoController.info);

export default router;
