import mongoose from "mongoose";

const KudoSchema: any = new mongoose.Schema({
    sender: {type: String, required: true},
    receiver: {type: Array, required: true},
    message: {type: Array, required: true},
    gif: {type: mongoose.Schema.Types.Mixed, default: null},
    likes: {type: Number, default: 0},
    people: {type: Array, default: []},
    author: {type: String, default: ""}
},{
    timestamps: true
})

export const KudoModel: any = mongoose.model('Kudo', KudoSchema);

//// mongoDB actions ////
//fetch kudo data
export const getKudos = () => KudoModel.find({});
export const getKudoById = (id: string) => KudoModel.findById(id);

//create new kudo
export const createKudo = (kudo: any) => KudoModel.create(kudo);

//delete kudo
export const deleteKudo = (id: string) => KudoModel.findByIdAndDelete(id);

//update kudo
export const updateKudo = (id: string, update: any) => KudoModel.findByIdAndUpdate(id, update);