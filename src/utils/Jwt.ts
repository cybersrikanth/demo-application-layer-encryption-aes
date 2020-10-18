import jwt from "jsonwebtoken";
import { Tokenable } from "../types/interface/Tokenable";
import { Person } from "../types/interface/Person";

const SECRET = process.env.SECRET;
const EXP = process.env.EXP;

export class Jwt {
    static getSecret = (user: Person) => `${SECRET}${user.password}`;

    static getToken = async (user: Person) => {
        const NEW_SECRET = Jwt.getSecret(user);
        const tokenContent: Tokenable = {
            id: user._id,
            session: user.session || "",
        };
        const token = await jwt.sign(tokenContent, NEW_SECRET, {
            expiresIn: EXP,
        });

        return token;
    };

    static verifyToken = async (token: string, user: Person) => {
        const NEW_SECRET = Jwt.getSecret(user);
        const verified: any = await jwt.verify(token, NEW_SECRET);
        return verified;
    };

    static decodeToken = async (token: string) => {
        const decoded = await jwt.decode(token);
        return typeof decoded === "object" ? decoded : null;
    };
}
