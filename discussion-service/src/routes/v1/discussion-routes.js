import { Router } from "express";
import { DiscussionController } from "../../controllers/index.js";
import { authenticate } from "../../middlewares/userAuth.js";

const router = Router();

let discussionController = new DiscussionController();

// Discussion creation routes
router.post("/create", authenticate, discussionController.createDiscussion);

// Get all Discussion
router.get("/", authenticate, discussionController.getAllDiscussion);

// Search Discussion by tags and text
router.get(
    "/search-tag",
    authenticate,
    discussionController.searchDiscussionByHashtag
);
router.get(
    "/search-text",
    authenticate,
    discussionController.searchDiscussionByText
);

// Discussion updation and deletion routes
// router.put("/:id", authenticate, discussionController.updateUser);
// router.delete(
//     "/:id",
//     authenticate,
//     discussionController.deleteUser
// );

export default router;
