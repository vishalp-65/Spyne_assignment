import { Schema, model } from "mongoose";
import commentSchema from "./comment";

const discussionSchema = new Schema(
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
        image: {
            type: String,
        },
        hashtags: [
            {
                type: String,
            },
        ],
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
        comments: [commentSchema],
        viewCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const discussion = model("Discussion", discussionSchema);

export default discussion;
