import mongoose from "mongoose";

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    // For creating new data
    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            console.log(error);
            throw error;
        }
    }

    // To get value by ID
    async get(id) {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            const response = await this.model.findById(objectId);
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }
}

export default CrudRepository;
