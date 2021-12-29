/**
 * @author CyberSrikanth
 * @email cybersrikanth001@gmail.com
 * @create date 2021-12-29 09:42:23
 * @modify date 2021-12-29 09:43:18
 * @desc [description]
 */
import { Router } from "express";
import { httpResponse } from "../utils/httpResponse";
import { HTTP_SUCCESS_RESPONSE } from "../constants/HTTP";
import { userRouter } from "./userRouter";
import { CryptoMiddleware } from "../middleware/CryptoMiddleware";
import { userRouterView } from "./userRouterView";

export const router = Router();


// Application layer encryption
router.use(CryptoMiddleware.decrypt)
router.use(CryptoMiddleware.encrypt)

router.use('/user', userRouterView);

router.get("/health-check", (_, res) => {
    httpResponse(HTTP_SUCCESS_RESPONSE.OK, "Ok", res);
});


router.use("/api/user", userRouter);
