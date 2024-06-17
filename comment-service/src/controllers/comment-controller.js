import { CommentService } from "../services/index.js";
import { errorObj, successObj } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";

let commentService;
class CommentController {
    constructor() {
        commentService = new CommentService();
    }

    async addComment(req, res) {
        try {
            const userId = req.user.id;
            const { text, discussionId } = req.body;

            // Calling comment-service for creating user
            const response = await commentService.addComment({
                discussionId,
                userId,
                text,
                createdOn: new Date(),
            });

            successObj.message = "Successfully added a comment";
            successObj.data = response;

            return res.status(StatusCodes.CREATED).json(successObj);
        } catch (error) {
            // Handle errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async replyToComment(req, res) {
        try {
            const userId = req.user.id;
            const { text, commentId } = req.body;

            if (!commentId || !userId) {
                errorObj.message = "comment ID and user ID is required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            const response = await commentService.replyToComment({
                commentId,
                userId,
                text,
            });

            successObj.message = "Successfully replied to comment";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async getAllCommentsWithReplyCount(req, res) {
        try {
            const { discussionId } = req.params;

            if (!discussionId) {
                errorObj.message = "Discussion ID is required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            const response = await commentService.getAllCommentsWithReplyCount(
                discussionId
            );

            successObj.message = "All comments";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async getRepliesForComment(req, res) {
        try {
            const { commentId } = req.params;
            if (!commentId) {
                errorObj.message = "Commetn ID is required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            const response = await commentService.getRepliesForComment(
                commentId
            );
            successObj.message = "Comment replies";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }
}

export default CommentController;
