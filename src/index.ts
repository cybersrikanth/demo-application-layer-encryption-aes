/**
 * @author CyberSrikanth
 * @email cybersrikanth001@gmail.com
 * @create date 2021-12-29 09:43:30
 * @modify date 2021-12-29 09:43:30
 * @desc This project is cloned from https://github.com/cybersrikanth/ts-node-express-boilerplate
 */
import express from "express";
import "./config/environment";
import cors from "./config/cors";
import { connect } from "./config/database";
import { httpResponse } from "./utils/httpResponse";
import { router } from "./router";
import { handler } from "./error/handler";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors);

export const Cache = new Map();

(async () => {
    try {
        await connect();
        console.log("db connection success");
        app.disable("x-powered-by");

        app.use("/", router);
        app.use(handler); // global error handler
        app.use("*", (_, res) => httpResponse(404, "Route Not Found", res));

        app.listen(PORT, () =>
            console.log("Express server is running on port", PORT)
        );
    } catch (error) {
        console.log("db connection failed", error);
        process.exit(1);
    }
})();
