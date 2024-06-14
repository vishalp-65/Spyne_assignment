import { User } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async searchByName(name) {
        try {
            const response = await User.find({ name: new RegExp(name, "i") });
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }
}

export default UserRepository;
