import { Response } from "express";

export const httpResponse = (code: number, data: any, res: Response) => {
    const response = {
        success: code < 400,
        data,
    };
    return res.status(code).json(response);
};
