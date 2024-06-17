import { Router } from "express";
import { CommentController } from "../../controllers/index.js";
import { authenticate } from "../../middlewares/userAuth.js";

const router = Router();

let commentController = new CommentController();

// Define routes
router.post("/create", authenticate, commentController.addComment);
router.post("/replies", authenticate, commentController.replyToComment);
router.get(
    "/:discussionId",
    authenticate,
    commentController.getAllCommentsWithReplyCount
);
router.get(
    "/replies/:commentId",
    authenticate,
    commentController.getRepliesForComment
);

export default router;
