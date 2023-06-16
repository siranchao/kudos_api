"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
//import { getUserBySessionToken } from "../db/users";
const isAuthenticated = async (req, res, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return res.status(401).json({
            message: 'Unauthorized, access token is missing'
        });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(accessToken, process.env.SECRET);
        (0, lodash_1.merge)(req.body, { identity: decodedToken });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid access token' });
    }
};
exports.isAuthenticated = isAuthenticated;
/**
 * This method is using session token and cookies to authenticate user, it is not being used
 * @param req
 * @param res
 * @param next
 * @returns
 */
/*
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        //check if user in session
        const sessionToken: any = req.cookies["cookie-name"];
        if(!sessionToken) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        //check if session token is valid
        const user: any = await getUserBySessionToken(sessionToken);
        if(!user) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        //merge user into request
        merge(req, {identity: user});
        return next();

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}
*/
/**
 * This method check if the current api parameter is the actual owner in the session, it is not being used
 * It checks if the http request parameter 'id' is equal to the current user id returned from previous middleware
 * @param req
 * @param res
 * @param next
 * @returns
 */
/*
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        if(currentUserId.toString() !== id) {
            return res.status(403).json({
                message: 'Unauthorized'
            })
        }

        return next();

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}
*/
//# sourceMappingURL=index.js.map