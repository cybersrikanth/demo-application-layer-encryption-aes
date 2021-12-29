import { Jwt } from "../utils/Jwt";
import { ERRORS } from "../error/ERRORS";
import UserModel from "../model/UserModel";
import { AuthRequest } from "../types/interface/AuthRequest";

export class AuthMiddleware {
    static validate = async (req:AuthRequest, _:any, next:(x?:any)=>void) => {
        try {
            const token = String(req.headers.authorization).split(" ")[1];
            if (!token) return next();
            const decoded = await Jwt.decodeToken(token);
            if (!decoded) throw ERRORS.ACCESS.NO_TOKEN;
            const user = await UserModel.findById(decoded.id).select(
                "+password"
            );
            if (!user) throw ERRORS.ACCESS.UN_AUTHORIZED;
            const verified = await Jwt.verifyToken(token, user);

            /*
                Remove session if you want to allow multiple sessions
                You can also use session object to allow multiple sessions and keep track on it
                Click the link below to know more
                https://cyber-srikanth.blogspot.com/2020/07/Maintaining-STATE-with-JWT.html
            */
            if(!verified) throw ERRORS.AUTH
            if (verified.session !== user.session)
                throw ERRORS.ACCESS.SESSION_EXPIRED;
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    };
}
