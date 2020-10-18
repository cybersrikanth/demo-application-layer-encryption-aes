import Mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

const DB_OPTIONS = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

export const connect = async () => {
    if (!DB_URI) throw new Error("error");
    return await Mongoose.connect(DB_URI, DB_OPTIONS);
};
