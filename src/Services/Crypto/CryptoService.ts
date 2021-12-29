import crypto from "crypto"
import { Cache } from "../..";
import { HttpException } from "../../error/HttpException";

export class CryptoService{
    static algo:string = "aes-256-cbc";
    private static defaultKey:Buffer = crypto.randomBytes(32);
    private static encoding :BufferEncoding= "base64";
    private static ivSeparator:string = ":";

    public static encryptText = (text: string, encKey?:string): string => {
        const iv = crypto.randomBytes(16);
        const key = encKey?Buffer.from(encKey, 'base64'):CryptoService.defaultKey;

        const cipher = crypto.createCipheriv(
            CryptoService.algo,
            Buffer.from(key),
            iv
        );
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString(CryptoService.encoding) + CryptoService.ivSeparator + encrypted.toString(CryptoService.encoding);
    };

    public static decryptText = (text: string, encKey?:string|undefined):string => {
        try {
            const [ivRaw, encryptedTextRaw] = text
                .split(CryptoService.ivSeparator);

            const key = encKey?Buffer.from(encKey, CryptoService.encoding):CryptoService.defaultKey;



            const iv = Buffer.from(ivRaw, CryptoService.encoding);

            const encryptedText = Buffer.from(encryptedTextRaw, CryptoService.encoding)
            const decipher = crypto.createDecipheriv(
                CryptoService.algo,
                key,
                iv
            );
            // decipher.setAutoPadding(false)
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();

        } catch (error) {
            console.error(error);
            throw new HttpException(422, "Failed to decrypt");
        }
    };

    public static getDefaultKey = () => CryptoService.defaultKey.toString(CryptoService.encoding)

    private static generateKey = () => crypto.randomBytes(32).toString(CryptoService.encoding);

    public static createKey = (session?:string) => {
        const newKey = CryptoService.generateKey();
        const index = crypto.createHash('md5').update(session?session:newKey).digest('base64');

        Cache.set(index, newKey);

        return [index, newKey];
    }

    public static getKey = (index:string, session?:boolean) => {
        if(session){
            const sessionId = index;
            index = crypto.createHash('md5').update(index).digest('base64');
            Cache.has(index)?null:CryptoService.createKey(sessionId);
        }
        
        const key = Cache.get(index);
        if(!key) throw new HttpException(400, 'Invalid encryption key');
        
        // if(!session) Cache.delete(index);


        return key;
    }

}