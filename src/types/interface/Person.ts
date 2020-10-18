import { Document } from "mongoose";

export interface Person extends Document {
    email: string;
    name: string;
    password?: string;
    session?: string;
    settings?: object;
    plan?: object;
    createdAt?: Date;
    updatedAt?: Date;
}
