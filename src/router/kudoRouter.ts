import express from "express";
import { isAuthenticated } from "../middlewares/index";
import { getAllKudos, getOneKudo, createNewKudo, deleteOneKudo, likeKudo, dislikeKudo, collectKudo, disCollectKudo } from "../controllers/kudos";


const router: express.Router = express.Router();

export default (): express.Router => {

    router.get("/allKudos", getAllKudos);
    router.get("/oneKudo/:id", getOneKudo);

    //protected routes    
    router.post("/newKudo", isAuthenticated, createNewKudo);
    
    router.patch("/likeKudo/:id", isAuthenticated, likeKudo);
    router.patch("/dislikeKudo/:id", isAuthenticated, dislikeKudo);
    router.patch("/collectKudo/:id", isAuthenticated, collectKudo);
    router.patch("/disCollectKudo/:id", isAuthenticated, disCollectKudo);

    router.delete("/deleteKudo/:id", isAuthenticated, deleteOneKudo);

    return router;
}