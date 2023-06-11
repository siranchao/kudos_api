import express from "express";
import { register, login } from "../controllers/auth";
import { getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated } from "../middlewares/index";

const router: express.Router = express.Router();

export default (): express.Router => {

    router.post("/auth/register", register);
    router.post("/auth/login", login);
    router.get("/allUsers", isAuthenticated, getAllUsers); 
    router.patch("/updateUser/:id", isAuthenticated, updateUser);

    //unused routes:
    //router.delete("/deleteUser/:id", isAuthenticated, deleteUser);

    return router;
}