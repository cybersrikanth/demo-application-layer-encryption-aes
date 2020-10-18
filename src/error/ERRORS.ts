import { HttpException } from "./HttpException";
import { HTTP_ERROR_RESPONSE } from "../constants/HTTP";

/*
    Common errors
*/
const ACCESS = {
    UN_AUTHORIZED: new HttpException(
        HTTP_ERROR_RESPONSE.UN_AUTHORIZED,
        "Request not authorized"
    ),
    SESSION_EXPIRED: new HttpException(
        HTTP_ERROR_RESPONSE.FORBIDDEN,
        "Session expired"
    ),
    TOKEN_EXPIRED: new HttpException(
        HTTP_ERROR_RESPONSE.UN_AUTHORIZED,
        "Token Expired"
    ),
    NO_TOKEN: new HttpException(HTTP_ERROR_RESPONSE.FORBIDDEN, "Invalid Token"),
};

const AUTH = {
    LOGIN: new HttpException(
        HTTP_ERROR_RESPONSE.FORBIDDEN,
        "Invalid email or password"
    ),
};

export const ERRORS = {
    ACCESS,
    AUTH,
};
