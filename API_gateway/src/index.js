import express, { json, urlencoded } from "express";
import apiRoutes from "./routes/index.js";
import { ServerConfig } from "./config/index.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

const app = express();
app.use(json());

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 30, // Limit each IP to 2 requests per `window` (here, per 15 minutes)
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

// to use cookie
app.use(cookieParser());

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(
        `Successfully started the server on PORT : ${ServerConfig.PORT}`
    );
});
