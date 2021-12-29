import { Router } from "express";
import { UserController } from "../controller/UserController";
import { UserValidator } from "../validator/UserValidator";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { AuthRequest } from "../types/interface/AuthRequest";
import { CryptoService } from "../Services/Crypto/CryptoService";
import { httpResponse } from "../utils/httpResponse";
import { HTTP_SUCCESS_RESPONSE } from "../constants/HTTP";

export const userRouter = Router();

userRouter.post("/signup", [UserValidator.create], UserController.create);
userRouter.post("/signIn", [UserValidator.signIn], UserController.signIn);

userRouter.use(AuthMiddleware.validate);
userRouter.get("/encryption-key", (req:AuthRequest, res) =>{
    const {user} = req;
    let key = user?.session && CryptoService.getKey(user.session, true);
    key = key || CryptoService.createKey()[1];
    httpResponse(HTTP_SUCCESS_RESPONSE.OK, key, res);
});
userRouter.get('/me', UserController.me)
userRouter.put("/signout", UserController.signout);
