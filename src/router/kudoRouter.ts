import express from "express";
import { isAuthenticated } from "../middlewares/index";
import { getAllKudos, getOneKudo, createNewKudo, deleteOneKudo, updateLikes } from "../controllers/kudos";


const router: express.Router = express.Router();

export default (): express.Router => {
    
    router.post("/newKudo", createNewKudo);
    router.get("/allKudos", getAllKudos);
    router.get("/oneKudo/:id", getOneKudo);
    router.delete("/deleteKudo/:id", isAuthenticated, deleteOneKudo);
    router.patch("/updateLikes/:id", isAuthenticated, updateLikes);

    return router;
}