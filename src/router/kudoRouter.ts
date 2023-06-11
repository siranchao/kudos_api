import express from "express";
import { isAuthenticated } from "../middlewares/index";
import { getAllKudos, getOneKudo, createNewKudo, deleteOneKudo, updateLikes } from "../controllers/kudos";


const router: express.Router = express.Router();

export default (): express.Router => {

    router.get("/allKudos", getAllKudos);
    router.get("/oneKudo/:id", getOneKudo);

    //protected routes    
    router.post("/newKudo", isAuthenticated, createNewKudo);
    
    router.patch("/updateLikes/:id", isAuthenticated, updateLikes);
    router.delete("/deleteKudo/:id", isAuthenticated, deleteOneKudo);

    return router;
}