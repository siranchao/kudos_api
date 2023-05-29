import express from "express";
import { getUserByEmail, createUser } from "../db/users";
import { random, authentication } from "../helpers/index";

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
                message: 'User already exists'
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
                data: newUser
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

        const expectedPassword: string = authentication(user.authentication.salt, password);
        if(expectedPassword !== user.authentication.password) {
            return res.status(403).json({
                message: 'Incorrect password'
            })
        }

        const salt: string = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        //set cookies
        res.cookie('cookie-name', user.authentication.sessionToken, { domain: 'localhost', path: '/', httpOnly: true });
        return res.status(200).json({
            message: 'User logged in successfully',
            data: user
        }).end();

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}