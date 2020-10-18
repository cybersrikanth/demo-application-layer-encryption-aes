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

(async () => {
    try {
        await connect();
        console.log("db connection success");
        app.disable("x-powered-by");
        app.use("/api", router); // api routes
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
