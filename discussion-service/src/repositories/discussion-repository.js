import { Discussion } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class DiscussionRepository extends CrudRepository {
    constructor() {
        super(Discussion);
    }

    async getDiscussionByHashtag(hashtag) {
        try {
            const response = await Discussion.find({
                hashtags: hashtag,
            });
            return response;
        } catch (error) {
            console.log("Error while getting discussion by hashtag in repo.");
            throw error;
        }
    }

    async getDiscussionByText(text) {
        try {
            const regex = new RegExp(text, "i"); // Create a case-insensitive regular expression
            const response = await Discussion.find({
                text: { $regex: regex },
            });
            return response;
        } catch (error) {
            console.log("Error while getting discussion by hashtag in repo.");
            throw error;
        }
    }
}

export default DiscussionRepository;
