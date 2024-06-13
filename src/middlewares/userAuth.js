import jwt from "jsonwebtoken";
import { ServerConfig } from "../config/index.js";
import { errorObj } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";

//auth
export async function authenticate(req, res, next) {
    try {
        //extract token
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");

        //if token missing, then return response
        if (!token) {
            errorObj.success = false;
            errorObj.message = "Token is missing";
            return res.status(StatusCodes.UNAUTHORIZED).json(errorObj);
        }

        //verify the token
        try {
            const decode = jwt.verify(token, ServerConfig.JWT_SECRET_KEY);
            console.log("decode= ", decode);
            req.user = decode;
        } catch (err) {
            //verification - issue
            errorObj.success = false;
            errorObj.message = "Token is invalid";
            return res.status(StatusCodes.UNAUTHORIZED).json(errorObj);
        }
        next();
    } catch (error) {
        errorObj.success = false;
        errorObj.message = "Something went wrong while validating the token";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
    }
}
