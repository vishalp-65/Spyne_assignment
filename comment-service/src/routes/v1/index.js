import { Router } from "express";
import commentRoutes from "./comment-routes.js";
import { InfoController } from "../../controllers/index.js";

const router = Router();

// discussions routes

router.use("/comments", commentRoutes);

// Checking api is live
router.get("/info", InfoController.info);

export default router;
