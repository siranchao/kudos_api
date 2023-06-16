"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disCollectKudo = exports.collectKudo = exports.dislikeKudo = exports.likeKudo = exports.deleteOneKudo = exports.createNewKudo = exports.myKudos = exports.getOneKudo = exports.getKudosKpi = exports.getAllKudos = void 0;
const kudos_1 = require("../db/kudos");
const getAllKudos = async (req, res) => {
    try {
        const allKudos = await (0, kudos_1.getKudos)();
        if (allKudos) {
            return res.status(200).json({
                message: 'Kudos fetched successfully',
                data: allKudos
            }).end();
        }
        else {
            return res.status(400).json({
                message: 'Something went wrong when fetching kudos',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.getAllKudos = getAllKudos;
const getKudosKpi = async (req, res) => {
    try {
        const kudos = await (0, kudos_1.getKudos)();
        const total = kudos.length;
        let recent = 0;
        const today = new Date();
        if (kudos.length === 0) {
            return res.status(400).json({
                message: 'Kudo list is empty',
            });
        }
        for (const kudo of kudos) {
            if ((today.getTime() - new Date(kudo.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 30) {
                recent++;
            }
        }
        return res.status(200).json({ total, recent });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.getKudosKpi = getKudosKpi;
const getOneKudo = async (req, res) => {
    try {
        const id = req.params.id;
        const kudo = await (0, kudos_1.getKudoById)(id);
        if (kudo) {
            return res.status(200).json({
                message: 'Kudo fetched successfully',
                data: kudo
            }).end();
        }
        else {
            return res.status(400).json({
                message: 'Something went wrong when fetching kudo',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.getOneKudo = getOneKudo;
const myKudos = async (req, res) => {
    try {
        const userId = req.body.identity.id;
        const userName = req.body.identity.name;
        const allKudos = await (0, kudos_1.getKudos)();
        if (!allKudos) {
            return res.status(400).json({
                message: 'Something went wrong when fetching kudos',
            });
        }
        const sent = allKudos.filter((kudo) => {
            return kudo.author === userId;
        });
        const received = allKudos.filter((kudo) => {
            return kudo.receiver.includes(userName);
        });
        const liked = allKudos.filter((kudo) => {
            return kudo.likes.includes(userId);
        });
        const collected = allKudos.filter((kudo) => {
            return kudo.collects.includes(userId);
        });
        return res.status(200).json({
            message: 'My Kudos fetched successfully',
            data: {
                sent,
                received,
                liked,
                collected
            }
        }).end();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.myKudos = myKudos;
const createNewKudo = async (req, res) => {
    try {
        const { sender, receiver, message, gif, identity } = req.body;
        if (!sender || !receiver || !message) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const newKudo = await (0, kudos_1.createKudo)({
            sender,
            receiver,
            message,
            gif,
            author: identity.id
        });
        if (newKudo) {
            return res.status(200).json({
                message: 'Kudo created successfully',
                data: newKudo
            }).end();
        }
        else {
            return res.status(400).json({
                message: 'Something went wrong when creating kudo',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.createNewKudo = createNewKudo;
const deleteOneKudo = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedKudo = await (0, kudos_1.deleteKudo)(id);
        if (!kudos_1.deleteKudo) {
            return res.status(400).json({
                message: 'Cannot find this kudo',
            });
        }
        return res.status(200).json({
            message: 'Kudo deleted successfully',
            data: deletedKudo
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.deleteOneKudo = deleteOneKudo;
const likeKudo = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.body.identity.id;
        if (!id || !userId) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const kudo = await (0, kudos_1.getKudoById)(id);
        if (!kudo.likes.includes(userId)) {
            const value = kudo.likes;
            value.push(userId);
            const updatedKudo = await (0, kudos_1.updateKudo)(id, { likes: value });
            if (updatedKudo) {
                return res.status(200).json({
                    message: 'Kudo updated successfully',
                    data: updatedKudo
                }).end();
            }
            else {
                return res.status(400).json({
                    message: 'Something went wrong when updating kudo',
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'Kudo already liked'
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.likeKudo = likeKudo;
const dislikeKudo = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.body.identity.id;
        if (!id || !userId) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const kudo = await (0, kudos_1.getKudoById)(id);
        if (kudo.likes.includes(userId)) {
            const value = kudo.likes.filter((item) => item !== userId);
            const updatedKudo = await (0, kudos_1.updateKudo)(id, { likes: value });
            if (updatedKudo) {
                return res.status(200).json({
                    message: 'Kudo updated successfully',
                    data: updatedKudo
                }).end();
            }
            else {
                return res.status(400).json({
                    message: 'Something went wrong when updating kudo',
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'Kudo already disliked'
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.dislikeKudo = dislikeKudo;
const collectKudo = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.body.identity.id;
        if (!id || !userId) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const kudo = await (0, kudos_1.getKudoById)(id);
        if (!kudo.collects.includes(userId)) {
            const value = kudo.collects;
            value.push(userId);
            const updatedKudo = await (0, kudos_1.updateKudo)(id, { collects: value });
            if (updatedKudo) {
                return res.status(200).json({
                    message: 'Kudo updated successfully',
                    data: updatedKudo
                }).end();
            }
            else {
                return res.status(400).json({
                    message: 'Something went wrong when updating kudo',
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'Kudo already liked'
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.collectKudo = collectKudo;
const disCollectKudo = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.body.identity.id;
        if (!id || !userId) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }
        const kudo = await (0, kudos_1.getKudoById)(id);
        if (kudo.collects.includes(userId)) {
            const value = kudo.collects.filter((item) => item !== userId);
            const updatedKudo = await (0, kudos_1.updateKudo)(id, { collects: value });
            if (updatedKudo) {
                return res.status(200).json({
                    message: 'Kudo updated successfully',
                    data: updatedKudo
                }).end();
            }
            else {
                return res.status(400).json({
                    message: 'Something went wrong when updating kudo',
                });
            }
        }
        else {
            return res.status(400).json({
                message: 'Kudo already liked'
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        });
    }
};
exports.disCollectKudo = disCollectKudo;
//# sourceMappingURL=kudos.js.map