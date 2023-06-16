"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        //sessionToken: {type: String, select: false}
    }
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
//// mongoDB actions ////
//fetch user data
const getUsers = () => exports.UserModel.find({});
exports.getUsers = getUsers;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
//this method is disabled
//export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
//create user
const createUser = (user) => exports.UserModel.create(user);
exports.createUser = createUser;
//delete user
const deleteUserById = (id) => exports.UserModel.findByIdAndDelete(id);
exports.deleteUserById = deleteUserById;
//update user
const updateUserById = (id, update) => exports.UserModel.findByIdAndUpdate(id, update);
exports.updateUserById = updateUserById;
//# sourceMappingURL=users.js.map