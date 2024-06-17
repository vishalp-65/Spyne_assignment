import { DiscussionService } from "../services/index.js";
import { errorObj, successObj } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";

let discussionService;
class DiscussionController {
    constructor() {
        discussionService = new DiscussionService();
    }

    async createDiscussion(req, res) {
        try {
            // destructure all values
            let { text, image, hashtags } = req.body;
            const userId = req.user.id;

            // Check if userId is present
            if (!userId) {
                errorObj.message = "User not found";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            // Check if text is present
            if (!text) {
                errorObj.message = "Text is required";
                errorObj.success = false;
                return res.status(StatusCodes.BAD_REQUEST).json(errorObj);
            }

            // Convert hashtags to lowercase
            // Convert hashtags to an array of lowercase strings
            if (typeof hashtags === "string") {
                hashtags = [hashtags.toLowerCase()];
            } else if (Array.isArray(hashtags)) {
                hashtags = hashtags.map((tag) => tag.toLowerCase());
            } else {
                hashtags = [];
            }

            // Calling discussion-service for creating user
            const response = await discussionService.createDiscussion({
                userId,
                text,
                image,
                hashtags,
            });

            successObj.message = "Successfully created a new discussion";
            successObj.data = response;

            return res.status(StatusCodes.CREATED).json(successObj);
        } catch (error) {
            // Handle errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async updateDiscussion(req, res) {
        try {
            const id = req.params;

            if (!id) {
                errorObj.message = "Discussion ID is required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            const { text, image, hashtags } = req.body;
            const userId = req.user.id;

            const response = await discussionService.updateDiscussion({
                id,
                userId,
                text,
                image,
                hashtags,
            });

            successObj.message = "Successfully updated the discussion";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async deleteDiscussion(req, res) {
        try {
            const id = req.params;
            const userId = req.user.id;

            if (!id) {
                errorObj.message = "Discussion ID is required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            const response = await discussionService.deleteDiscussion({
                id,
                userId,
            });

            successObj.message = "Successfully delete the Discussion";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async getAllDiscussion(req, res) {
        try {
            const response = await discussionService.getAllDiscussion();
            successObj.message = "All Discussion";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async searchDiscussionByHashtag(req, res) {
        try {
            const { hashtag } = req.query;

            if (!hashtag) {
                return this.getAllDiscussion(req, res); // If hashtag is empty then return all discussions
            }

            const response = await discussionService.searchDiscussionByHashtag(
                hashtag
            );
            successObj.message = "Discussions related to hashtag";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async searchDiscussionByText(req, res) {
        try {
            const { text } = req.query;

            if (!text) {
                return this.getAllDiscussion(req, res); // If text is empty then return all discussions
            }

            const response = await discussionService.searchDiscussionByText(
                text
            );
            successObj.message = "Discussion related to text";
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

export default DiscussionController;
