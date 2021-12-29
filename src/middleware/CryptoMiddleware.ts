import { Response } from "express";
import { Cache } from "..";
import {CryptoService} from "../Services/Crypto/CryptoService";
import { AuthRequest } from "../types/interface/AuthRequest";

export class CryptoMiddleware {

    static encrypt = ( req:AuthRequest, response:Response, next:(x?:any)=>void) =>{
        const except = [
            '/api/user/encryption-key'
        ];
        if(except.includes(req.path)) return next();

        const oldSend = response.json;
        response.json = (data) => {
            const jsonData = data
            if(jsonData.data){
                const session = req.user?.session;
                // if(session)
                jsonData.data = CryptoService.encryptText(JSON.stringify(jsonData.data), session?CryptoService.getKey(session, true):CryptoService.getKey(req.encKey??''));
            }
            response.json = oldSend;
            return response.json(jsonData);
        }
        next()
    }

    static decrypt = (request:AuthRequest, _:any, next:(x?:any)=>void) =>{
        const data = request?.body;

        const encKey = Cache.get(data._encKey);
        request.encKey = data._encKey;
        delete data._encKey;


        if(typeof data === "object"){
            Object.keys(data).map((key)=> {

                const decrypted = CryptoService.decryptText(data[key], encKey)
                data[key] = typeof decrypted === "string"? JSON.parse(decrypted):decrypted;
            }
            );
            // const jsonDataString = typeof data !== "string"?JSON.stringify(data):data
            // request.data.data = JSON.parse(CryptoService.decryptText(jsonDataString));
        }
        next()
    }
}