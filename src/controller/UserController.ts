import { httpResponse } from "../utils/httpResponse";
import { HTTP_SUCCESS_RESPONSE } from "../constants/HTTP";
import { ERRORS } from "../error/ERRORS";
import { Hasher } from "../utils/Hasher";
import { Jwt } from "../utils/Jwt";
import UserModel from "../model/UserModel";
import { Request, Response } from "express";
import { AuthRequest } from "../types/interface/AuthRequest";

export class UserController {
    /*
        catch all errors and pass it to next();
        so that we can handle those in global error handler "src/Error/handler.js"
    */
    static create = async (
        req: Request,
        res: Response,
        next: (x?: any) => void
    ) => {
        try {
            const { user } = req.body;
            const newUser = new UserModel(user);
            await newUser.save();
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, newUser, res);
        } catch (error) {
            next(error);
        }
    };

    static signIn = async (
        req: Request,
        res: Response,
        next: (x?: any) => void
    ) => {
        try {
            const { user } = req.body;
            const newUser = await UserModel.findOne({
                email: user.email,
            }).select("+password");
            if (!newUser) throw ERRORS.AUTH.LOGIN;
            const valid = await Hasher.validatePassword(
                user.password,
                newUser.password || ""
            );
            if (!valid) throw ERRORS.AUTH.LOGIN;
            const session = new Date().valueOf().toString();
            newUser.session = session;
            newUser.save();
            // const updatedUser = await UserModel.findByIdAndUpdate(
            //     newUser._id,
            //     {
            //         session,
            //     },
            //     { new: true }
            // ).select("+password");
            // if(!updatedUser) throw ERRORS.
            const token = await Jwt.getToken(newUser);
            console.log(newUser);
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, token, res);
        } catch (error) {
            next(error);
        }
    };

    static signout = async (
        req: AuthRequest,
        res: Response,
        next: (x?: any) => void
    ) => {
        try {
            const { user } = req;
            if (!user) throw ERRORS.ACCESS.UN_AUTHORIZED;
            user.session = "";
            user.save();
            // await UserModel.updateOne({ _id: user._id }, { session: "" });
            return httpResponse(HTTP_SUCCESS_RESPONSE.OK, "signed out", res);
        } catch (error) {
            next(error);
        }
    };
}
