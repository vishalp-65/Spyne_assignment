import { Comment } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    async getAllCommentOfDiscussion(discussionId) {
        try {
            const response = await Comment.find({
                discussionId: discussionId,
            });
            return response;
        } catch (error) {
            console.log("Error while getting comment.");
            throw error;
        }
    }
}

export default CommentRepository;
