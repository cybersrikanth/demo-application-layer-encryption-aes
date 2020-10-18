import { ErrorMessageType } from "../ErrorMessageType";

export interface Throwable {
    httpCode: number;
    message: ErrorMessageType;
}
