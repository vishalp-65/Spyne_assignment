import { Router } from "express";
import { ServerConfig } from "../../config/index.js";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authenticate } from "../../middlewares/userAuth.js";

const router = Router();

// Define routes
router.use(
    "/user-service",
    createProxyMiddleware({
        target: ServerConfig.USER_SERVICE_URL,
        changeOrigin: true,
    })
);
router.use(
    "/discussion-service",
    authenticate,
    createProxyMiddleware({
        target: ServerConfig.DISCUSSION_SERVICE_URL,
        changeOrigin: true,
    })
);
router.use(
    "/comment-service",
    authenticate,
    createProxyMiddleware({
        target: ServerConfig.COMMENT_SERVICE_URL,
        changeOrigin: true,
    })
);

export default router;
