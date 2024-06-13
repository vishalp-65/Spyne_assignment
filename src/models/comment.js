import { Schema, model } from "mongoose";

const commentSchema = new Schema({
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

export default commentSchema;
