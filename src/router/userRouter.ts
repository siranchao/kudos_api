import express from "express";
import { register, login } from "../controllers/auth";
import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares/index";

const router: express.Router = express.Router();

export default (): express.Router => {

    router.post("/auth/register", register);
    router.post("/auth/login", login);
    router.get("/allUsers", isAuthenticated, getAllUsers); 
    router.delete("/deleteUser/:id", isAuthenticated, isOwner, deleteUser);
    router.patch("/updateUser/:id", isAuthenticated, isOwner, updateUser);

    return router;
}