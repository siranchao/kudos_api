"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const users_1 = require("../controllers/users");
const index_1 = require("../middlewares/index");
const router = express_1.default.Router();
exports.default = () => {
    router.post("/auth/register", auth_1.register);
    router.post("/auth/login", auth_1.login);
    //protected routes   
    router.get("/allUsers", index_1.isAuthenticated, users_1.getAllUsers);
    router.patch("/updateUser/:id", index_1.isAuthenticated, users_1.updateUser);
    //unused routes:
    //router.delete("/deleteUser/:id", isAuthenticated, deleteUser);
    return router;
};
//# sourceMappingURL=userRouter.js.map