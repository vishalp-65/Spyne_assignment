import { CommentRepository } from "../repositories/index.js";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
    }

    async addComment(data) {
        try {
            // Creating discussion
            const discussion = await this.commentRepository.create(data);
            return discussion;
        } catch (error) {
            // Handle error
            console.log("Something went wrong while creating comment");
            console.log(error);
            throw error;
        }
    }

    async replyToComment(data) {
        try {
            if (!data) return;
            // checking if comment is present
            let comment = await this.commentRepository.get(data.commentId);

            if (!comment) {
                // Throw error if comment not exists
                throw {
                    message: "comment not exists.",
                };
            }

            const newReply = {
                userId: data.userId,
                text: data.text,
                createdOn: new Date(),
            };

            const updatedComment = await this.commentRepository.update(
                { _id: data.commentId },
                { $push: { replies: newReply } }
            );

            if (updatedComment.nModified === 0) {
                // Throw error if comment not exists
                throw {
                    message: "comment not found.",
                };
            }

            const response = await this.commentRepository.get(data.commentId);

            return response;
        } catch (error) {
            // Handle error
            console.log("Something went wrong while creating reply to comment");
            console.log(error);
            throw error;
        }
    }

    async getAllCommentsWithReplyCount(discussionId) {
        try {
            // checking if comment is present
            let comments =
                await this.commentRepository.getAllCommentOfDiscussion(
                    discussionId
                );

            if (!comments) {
                // Throw error if comment not created by the current user
                throw {
                    message: "comment not exists.",
                };
            }

            const commentsWithReplyCount = comments.map((comment) => ({
                _id: comment._id,
                userId: comment.userId,
                text: comment.text,
                createdOn: comment.createdOn,
                replyCount: comment.replies.length,
            }));

            return commentsWithReplyCount;
        } catch (error) {
            // Handle error
            console.log("Something went wrong while getting comments");
            console.log(error);
            throw error;
        }
    }

    async getRepliesForComment(commentId) {
        try {
            const comments = await this.commentRepository.get(commentId);

            if (!comments) {
                // Throw error if comment not created by the current user
                throw {
                    message: "comment not exists.",
                };
            }

            return comments;
        } catch (error) {
            // Handle error
            console.log(
                "Something went wrong while getting replies of comment"
            );
            console.log(error);
            throw error;
        }
    }
}

export default CommentService;
