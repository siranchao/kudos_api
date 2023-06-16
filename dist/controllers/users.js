"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = void 0;
const users_1 = require("../db/users");
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await (0, users_1.getUsers)();
        if (allUsers) {
            return res.status(200).json({
                message: 'Users fetched successfully',
                data: allUsers
            }).end();
        }
        else {
            return res.status(400).json({
                message: 'Something went wrong when fetching users',
                data: null
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
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await (0, users_1.deleteUserById)(userId);
        if (!deletedUser) {
            return res.status(400).json({
                message: 'Cannot find this user',
            });
        }
        return res.status(200).json({
            message: 'User deleted successfully',
            data: deletedUser
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const user = await (0, users_1.getUserById)(id);
        //update username
        user.username = username;
        await user.save();
        return res.status(200).json({
            message: 'User updated successfully',
            data: user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=users.js.map