import { Throwable } from "../types/interface/Throwable";
import { ErrorMessageType } from "../types/ErrorMessageType";

export class HttpException implements Throwable {
    httpCode = 500;
    message: ErrorMessageType = "Internal Server Error";

    constructor(httpCode: number, message: ErrorMessageType) {
        this.httpCode = httpCode;
        this.message = message;
    }
}
