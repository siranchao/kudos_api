import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';


export const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET).digest('hex');
}


//JWT
interface SignOptions {
    expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTIONS: SignOptions = {
    expiresIn: '1d',
}

export function signJwtToken(payload: JwtPayload, options: SignOptions = DEFAULT_SIGN_OPTIONS) {
    const token = jwt.sign(payload, process.env.SECRET, options);
    return token;
}

export function verifyJwtToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET) as JwtPayload;
        return decoded;

    } catch(error) {
        console.log(error);
        return null;
    }
}