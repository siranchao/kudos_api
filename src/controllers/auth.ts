import express from "express";
import { getUserByEmail, createUser } from "../db/users";
import { random, authentication, signJwtToken } from "../helpers/index";

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body;
        //validate input fields
        if(!email || !username || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }
        //check if user already exists
        const user = await getUserByEmail(email);
        if(user) {
            return res.status(400).json({
                message: 'This email already exists'
            })
        }

        //create user authentication
        const salt: string = random();
        const newUser: any = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        })

        if(newUser) {
            return res.status(200).json({
                message: 'New User created',
            }).end();
        } else {
            return res.status(400).json({
                message: 'Something went wrong when creating user'
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const user: any = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user) {
            return res.status(400).json({
                message: 'User does not exist'
            })
        }

        const hashedPassword: string = authentication(user.authentication.salt, password);
        if(hashedPassword !== user.authentication.password) {
            return res.status(403).json({
                message: 'Incorrect password',

            })
        }

        /**
         * generate random token for each session and set cookies. Not being used
         */
        // const salt: string = random();
        // user.authentication.sessionToken = authentication(salt, user._id.toString());
        // await user.save();

        //set jwt token
        const val: any = { id: user._id, email: user.email }
        const accessToken = signJwtToken(val);

        return res.status(200).json({
            message: 'User logged in successfully',
            data: {...val, accessToken}
        }).end();

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}