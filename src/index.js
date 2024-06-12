import express, { json, urlencoded } from "express";
import apiRoutes from "./routes/index.js";
import { DatabaseConfig, ServerConfig } from "./config/index.js";

const app = express();
app.use(json());

app.use(urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(
        `Successfully started the server on PORT : ${ServerConfig.PORT}`
    );
    await DatabaseConfig.connect();
    console.log("MongoDB database connect");
});
