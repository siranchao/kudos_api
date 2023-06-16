"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKudo = exports.deleteKudo = exports.createKudo = exports.getKudoById = exports.getKudos = exports.KudoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const KudoSchema = new mongoose_1.default.Schema({
    sender: { type: String, required: true },
    receiver: { type: Array, required: true },
    message: { type: Array, required: true },
    gif: { type: mongoose_1.default.Schema.Types.Mixed, default: null },
    likes: { type: Array, default: [] },
    collects: { type: Array, default: [] },
    author: { type: String, default: "" }
}, {
    timestamps: true
});
exports.KudoModel = mongoose_1.default.model('Kudo', KudoSchema);
//// mongoDB actions ////
//fetch kudo data
const getKudos = () => exports.KudoModel.find({});
exports.getKudos = getKudos;
const getKudoById = (id) => exports.KudoModel.findById(id);
exports.getKudoById = getKudoById;
//create new kudo
const createKudo = (kudo) => exports.KudoModel.create(kudo);
exports.createKudo = createKudo;
//delete kudo
const deleteKudo = (id) => exports.KudoModel.findByIdAndDelete(id);
exports.deleteKudo = deleteKudo;
//update kudo
const updateKudo = (id, update) => exports.KudoModel.findByIdAndUpdate(id, update);
exports.updateKudo = updateKudo;
//# sourceMappingURL=kudos.js.map