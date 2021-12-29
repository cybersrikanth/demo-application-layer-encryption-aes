import { Request } from "express";
import { Person } from "./Person";

export interface AuthRequest extends Request {
    user?: Person;
    [x: string]: any;
    encKey?: string;
}
