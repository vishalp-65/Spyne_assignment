import { Schema, model } from "mongoose";

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
        updatedAt: {
            type: Date,
            default: Date.now(),
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        viewCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Create an index on hashtags for optimized search
discussionSchema.index({ hashtags: 1 });

const discussion = model("Discussion", discussionSchema);

export default discussion;
