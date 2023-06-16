"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../middlewares/index");
const kudos_1 = require("../controllers/kudos");
const router = express_1.default.Router();
exports.default = () => {
    router.get("/allKudos", kudos_1.getAllKudos);
    router.get("/oneKudo/:id", kudos_1.getOneKudo);
    router.get("/kudosKpi", kudos_1.getKudosKpi);
    //protected routes    
    router.post("/newKudo", index_1.isAuthenticated, kudos_1.createNewKudo);
    router.get("/myKudos", index_1.isAuthenticated, kudos_1.myKudos);
    router.patch("/likeKudo/:id", index_1.isAuthenticated, kudos_1.likeKudo);
    router.patch("/dislikeKudo/:id", index_1.isAuthenticated, kudos_1.dislikeKudo);
    router.patch("/collectKudo/:id", index_1.isAuthenticated, kudos_1.collectKudo);
    router.patch("/disCollectKudo/:id", index_1.isAuthenticated, kudos_1.disCollectKudo);
    router.delete("/deleteKudo/:id", index_1.isAuthenticated, kudos_1.deleteOneKudo);
    return router;
};
//# sourceMappingURL=kudoRouter.js.map