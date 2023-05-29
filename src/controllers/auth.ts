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
        const salt = random();
        const newUser = await createUser({
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