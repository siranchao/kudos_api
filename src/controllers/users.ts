import express from "express";
import { getUsers, deleteUserById, getUserById } from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const allUsers: any = await getUsers();

        if(allUsers) {
            return res.status(200).json({
                message: 'Users fetched successfully',
                data: allUsers
            }).end();
        } else {
            return res.status(400).json({
                message: 'Something went wrong when fetching users',
                data: null
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId: string = req.params.id;
        const deletedUser: any = await deleteUserById(userId);

        return res.status(200).json({
            message: 'User deleted successfully',
            data: deletedUser
        })

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if(!username) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const user = await getUserById(id);

        //update username
        user.username = username
        await user.save();

        return res.status(200).json({
            message: 'User updated successfully',
            data: user
        })

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}