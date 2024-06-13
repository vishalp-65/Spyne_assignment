import { UserService } from "../services/index.js";
import { errorObj, successObj } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";

let userService;
class AuthController {
    constructor() {
        userService = new UserService();
    }

    async createUser(req, res) {
        try {
            // destructure all values
            const { name, email, password, mobileNo } = req.body;

            // Check if all required fields are present
            if (!name || !email || !password || !mobileNo) {
                errorObj.message = "All fields are required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            // Calling user-service for creating user
            const response = await userService.signUp({
                name,
                email,
                password,
                mobileNo,
            });

            successObj.message = "Successfully created a new user";
            successObj.data = response;

            return res.status(StatusCodes.CREATED).json(successObj);
        } catch (error) {
            // Handle errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async logIn(req, res) {
        try {
            // Distructure all values
            const { email, password } = req.body;

            // Checking all required fields are present
            if (!email || !password) {
                errorObj.message = "All fields are required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            // Calling user-service for loggin the user
            const response = await userService.signIn(req.body);

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            // sending cookies with token
            return res
                .cookie("token", response.token, options)
                .status(StatusCodes.OK)
                .json({
                    success: true,
                    data: {
                        token: response.token,
                        user: response.user,
                    },
                    message: `User Login Success`,
                });
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params;

            if (!id) {
                errorObj.message = "ID is required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            const { name, email, mobileNo } = req.body;

            const response = await userService.updateUser({
                id,
                name,
                email,
                mobileNo,
            });

            successObj.message = "Successfully updated the user";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params;

            if (!id) {
                errorObj.message = "ID is required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            const response = await userService.deleteUser(id);

            successObj.message = "Successfully delete the user";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async getAllUsers(req, res) {
        try {
            const response = await userService.getAllUsers();
            successObj.message = "All users";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async searchUser(req, res) {
        try {
            const { name } = req.query;

            if (!name) {
                return;
            }

            const response = await userService.searchUser(name);
            successObj.message = "User data";
            successObj.data = response;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }
}

export default AuthController;
