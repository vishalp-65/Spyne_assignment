import { DiscussionRepository } from "../repositories/index.js";
import { ServerConfig } from "../config/index.js";

class DiscussionService {
    constructor() {
        this.discussionRepository = new DiscussionRepository();
    }

    async createDiscussion(data) {
        try {
            // Creating discussion
            const discussion = await this.discussionRepository.create({
                userId: data.userId,
                text: data.text,
                image: data.image,
                hashtags: data.hashtags,
            });
            return discussion;
        } catch (error) {
            // Handle error
            console.log("Something went wrong while creating discussion");
            console.log(error);
            throw error;
        }
    }

    async updateDiscussion(data) {
        try {
            if (!data) return;
            // checking if discussion is present
            let discussion = await this.discussionRepository.get(data.id);

            if (!discussion) {
                // Throw error if discussion not exists
                throw {
                    message: "discussion not exists.",
                };
            }

            if (discussion.userId.toString() !== data.userId) {
                throw {
                    message: "User not authorized to update this discussion",
                };
            }

            const updatedDiscussion = await this.discussionRepository.update(
                discussion.userId,
                data
            );
            return updatedDiscussion;
        } catch (error) {
            // Handle error
            console.log(
                "Something went wrong while updating discussion in services"
            );
            console.log(error);
            throw error;
        }
    }

    async deleteDiscussion(id) {
        try {
            // checking if discussion is present
            let discussion = await this.discussionRepository.get(id);

            if (!discussion) {
                // Throw error if discussion not created by the current user
                throw {
                    message: "Discussion not exists.",
                };
            }

            if (discussion.userId.toString() !== userId) {
                // Throw error if discussion not exists
                throw {
                    message: "User not authorized to delete this discussion.",
                };
            }

            await this.discussionRepository.destroy(id);
            return;
        } catch (error) {
            // Handle error
            console.log("Something went wrong while deleting discussion");
            console.log(error);
            throw error;
        }
    }

    async getAllDiscussion() {
        try {
            const response = await this.discussionRepository.getAll();
            return response;
        } catch (error) {
            // Handle error
            console.log("Something went wrong while getting all discussion");
            console.log(error);
            throw error;
        }
    }

    async searchDiscussionByHashtag(hashtags) {
        try {
            const lowercaseHashtag = hashtags.toLowerCase(); // Suppose search is case-insensitive

            console.log("hashtag", lowercaseHashtag);
            const response =
                await this.discussionRepository.getDiscussionByValue(
                    lowercaseHashtag
                );
            return response;
        } catch (error) {
            // Handle error
            console.log(
                "Something went wrong while getting discussion by hashtag in service."
            );
            console.log(error);
            throw error;
        }
    }

    async searchDiscussionByText(text) {
        try {
            const response =
                await this.discussionRepository.getDiscussionByValue(text);
            return response;
        } catch (error) {
            // Handle error
            console.log(
                "Something went wrong while getting discussion by text in service"
            );
            console.log(error);
            throw error;
        }
    }
}

export default DiscussionService;
