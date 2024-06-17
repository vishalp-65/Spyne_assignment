import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    discussionId: {
        type: Schema.Types.ObjectId,
        ref: "Discussion",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    replies: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            createdOn: {
                type: Date,
                default: Date.now,
            },
            likes: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
        },
    ],
});

const Comment = model("Comment", commentSchema);

export default Comment;
