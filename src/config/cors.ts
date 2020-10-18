import cors from "cors";
import { Request } from "express";
const maxAge = process.env.CORS_MAX_AGE;
const origin = process.env.CORS_ALLOWED_ORIGINS;
const origins: string[] | null = origin
    ? String(process.env.CORS_ALLOWED_ORIGINS).split(" ")
    : null;

const corsConfig = (req: Request, callback: (x?: any, y?: any) => void) => {
    const corsOptions = {
        maxAge,
        origin: origins
            ? origins.indexOf(req.headers.origin || "") !== -1
            : "*",
    };
    callback(null, corsOptions);
};

export default cors(corsConfig);
