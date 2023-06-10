import mongoose from "mongoose";

const UserSchema: any = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        //sessionToken: {type: String, select: false}
    }
});

export const UserModel: any = mongoose.model('User', UserSchema);


//// mongoDB actions ////
//fetch user data
export const getUsers = () => UserModel.find({});
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserById = (id: string) => UserModel.findById(id);

//this method is disabled
//export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });



//create user
export const createUser = (user: any) => UserModel.create(user);

//delete user
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete(id);

//update user
export const updateUserById = (id: string, update: any) => UserModel.findByIdAndUpdate(id, update);