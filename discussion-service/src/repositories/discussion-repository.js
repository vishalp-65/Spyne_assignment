import { Discussion } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class DiscussionRepository extends CrudRepository {
    constructor() {
        super(Discussion);
    }

    async getDiscussionByValue(hashtag) {
        try {
            console.log("hashtag in repo", hashtag);
            const regex = new RegExp(`^${hashtag}$`, "i"); // Create a case-insensitive regular expression
            const response = await Discussion.find({
                hashtags: { $regex: regex },
            });
            console.log("response from repo", response);
            return response;
        } catch (error) {
            console.log("Error while getting discussion by hashtag in repo.");
            throw error;
        }
    }
}

export default DiscussionRepository;
