import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const DISCUSSION_SERVICE_URL = process.env.DISCUSSION_SERVICE_URL;
const COMMENT_SERVICE_URL = process.env.COMMENT_SERVICE_URL;

export default {
    PORT,
    JWT_SECRET_KEY,
    USER_SERVICE_URL,
    DISCUSSION_SERVICE_URL,
    COMMENT_SERVICE_URL,
};
