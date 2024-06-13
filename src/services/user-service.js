import { UserRepository } from "../repositories/index.js";
import { ServerConfig } from "../config/index.js";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async generateJWT(data) {
        try {
            // checking if user is present
            const user = await this.userRepository.findOne({
                email: data.email,
            });

            // returning token
            return jsonwebtoken.sign(
                { id: user.id, email: user.email },
                ServerConfig.JWT_SECRET_KEY,
                { expiresIn: "7d" }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async signUp(data) {
        try {
            // checking if user is present
            let user = await this.userRepository.findOne({
                email: data.email,
            });
            // if user not present already then we can create user
            if (!user) {
                // Creating user
                const user = await this.userRepository.create({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    mobileNo: data.mobileNo,
                });
                return user;
            }
            // Throw error if email already exists
            throw {
                message: "User already exists for given email",
            };
        } catch (error) {
            // Handle error
            console.log("Something went wrong in user service");
            console.log(error);
            throw error;
        }
    }

    async signIn(data) {
        try {
            // checking if user is present
            const user = await this.userRepository.findOne({
                email: data.email,
            });

            if (!user) {
                throw {
                    message: "No user found",
                };
            }

            // Check password with current user
            const isPasswordMatch = await bcrypt.compareSync(
                data.password,
                user.password
            );
            if (!isPasswordMatch) {
                throw {
                    message: "Incorrect password",
                };
            }
            // Generate JWT token for user
            const token = await this.generateJWT(data);

            // Settign password undefined because we need to send user obj to frontend
            user.password = undefined;

            // Set cookie for token and return success response
            return { user, token };
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }

    async updateUser(data) {
        try {
            if (!data) return;
            // checking if user is present
            let user = await this.userRepository.get(data.id);

            if (!user) {
                // Throw error if user not exists
                throw {
                    message: "User not exists for given email",
                };
            }

            await this.userRepository.update(user.id, data);

            const updatedUser = await this.userRepository.findOne({
                email: user.email,
            });
            return updatedUser;
        } catch (error) {
            // Handle error
            console.log("Something went wrong in user service");
            console.log(error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            // checking if user is present
            let user = await this.userRepository.get(id);

            console.log("first");

            if (!user) {
                // Throw error if user not exists
                throw {
                    message: "User not exists for given email",
                };
            }

            await this.userRepository.destroy(id);
            return;
        } catch (error) {
            // Handle error
            console.log("Something went wrong in user service");
            console.log(error);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const response = await this.userRepository.getAll();
            return response;
        } catch (error) {
            // Handle error
            console.log("Something went wrong in user service");
            console.log(error);
            throw error;
        }
    }

    async searchUser(name) {
        try {
            console.log("name", name);
            const response = await this.userRepository.searchByName(name);
            return response;
        } catch (error) {
            // Handle error
            console.log("Something went wrong in user service");
            console.log(error);
            throw error;
        }
    }
}

export default UserService;
