import bcrypt from "bcrypt";

const ROUND = parseInt(process.env.SALT_ROUNDS || "10", 10);

export class Hasher {
    static hashPassword = async (password: string) => {
        const salt = await bcrypt.genSalt(ROUND);
        return await bcrypt.hash(password, salt);
    };

    static validatePassword = async (
        password: string,
        hashedPassword: string
    ) => await bcrypt.compare(password, hashedPassword);
}
