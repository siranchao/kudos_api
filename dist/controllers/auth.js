"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const users_1 = require("../db/users");
const index_1 = require("../helpers/index");
const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        //validate input fields
        if (!email || !username || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        //check if user already exists
        const user = await (0, users_1.getUserByEmail)(email);
        if (user) {
            return res.status(400).json({
                message: 'This email already exists'
            });
        }
        //create user authentication
        const salt = (0, index_1.random)();
        const newUser = await (0, users_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, index_1.authentication)(salt, password),
            }
        });
        if (newUser) {
            return res.status(200).json({
                message: 'New User created',
            }).end();
        }
        else {
            return res.status(400).json({
                message: 'Something went wrong when creating user'
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const user = await (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist'
            });
        }
        const hashedPassword = (0, index_1.authentication)(user.authentication.salt, password);
        if (hashedPassword !== user.authentication.password) {
            return res.status(403).json({
                message: 'Incorrect password',
            });
        }
        /**
         * generate random token for each session and set cookies. Not being used
         */
        // const salt: string = random();
        // user.authentication.sessionToken = authentication(salt, user._id.toString());
        // await user.save();
        //set jwt token
        const val = { id: user._id, name: user.username, email: user.email };
        const accessToken = (0, index_1.signJwtToken)(val);
        return res.status(200).json({
            message: 'User logged in successfully',
            data: { ...val, accessToken }
        }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.login = login;
//# sourceMappingURL=auth.js.map