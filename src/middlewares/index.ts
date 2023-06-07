import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";

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