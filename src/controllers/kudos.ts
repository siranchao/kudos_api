import express from "express";
import { getKudos, getKudoById, createKudo, deleteKudo, updateKudo } from "../db/kudos";


export const getAllKudos = async (req: express.Request, res: express.Response) => {
    try {
        const allKudos: any[] = await getKudos();

        if(allKudos) {
            return res.status(200).json({
                message: 'Kudos fetched successfully',
                data: allKudos
            }).end();
        } else {
            return res.status(400).json({
                message: 'Something went wrong when fetching kudos',
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const getKudosKpi = async (req: express.Request, res: express.Response) => {
    try {
        const kudos: any[] = await getKudos();
        const total: number = kudos.length;
        let recent: number = 0;
        const today: Date = new Date();

        if (kudos.length === 0) {
            return res.status(400).json({
                message: 'Kudo list is empty',
            })
        }

        for(const kudo of kudos) {
            if((today.getTime() - new Date(kudo.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 30 ) {
                recent++;
            }
        }

        return res.status(200).json({total,recent})

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const getOneKudo = async (req: express.Request, res: express.Response) => {
    try {
        const id: string = req.params.id;
        const kudo: any = await getKudoById(id);

        if(kudo) {
            return res.status(200).json({
                message: 'Kudo fetched successfully',
                data: kudo
            }).end();
        } else {
            return res.status(400).json({
                message: 'Something went wrong when fetching kudo',
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const myKudos = async (req: express.Request, res: express.Response) => {
    try {
        const userId: string = req.body.identity.id;
        const userName: string = req.body.identity.name;
        const allKudos: any[] = await getKudos();

        if(!allKudos) {
            return res.status(400).json({
                message: 'Something went wrong when fetching kudos',
            })
        }

        const sent: any[] = allKudos.filter((kudo: any) => {
            return kudo.author === userId
        })

        const received: any[] = allKudos.filter((kudo: any) => {
            return kudo.receiver.includes(userName)
        })

        const liked: any[] = allKudos.filter((kudo: any) => {
            return kudo.likes.includes(userId)
        })

        const collected: any[] = allKudos.filter((kudo: any) => {
            return kudo.collects.includes(userId)
        })

        return res.status(200).json({
            message: 'My Kudos fetched successfully',
            data: {
                sent,
                received,
                liked,
                collected
            }
        }).end();

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const createNewKudo = async (req: express.Request, res: express.Response) => {
    try {
        const { sender, receiver, message, gif, identity } = req.body;
        
        if(!sender || !receiver || !message) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const newKudo: any = await createKudo({
            sender,
            receiver,
            message,
            gif,
            author: identity.id
        })

        if(newKudo) {
            return res.status(200).json({
                message: 'Kudo created successfully',
                data: newKudo
            }).end();
        } else {
            return res.status(400).json({
                message: 'Something went wrong when creating kudo',
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const deleteOneKudo = async (req: express.Request, res: express.Response) => {
    try {
        const id: string = req.params.id;
        const deletedKudo: any = await deleteKudo(id);
        
        if(!deleteKudo) {
            return res.status(400).json({
                message: 'Cannot find this kudo',
            })
        }

        return res.status(200).json({
            message: 'Kudo deleted successfully',
            data: deletedKudo
        })

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const likeKudo = async (req: express.Request, res: express.Response) => {
    try {
        const id: string = req.params.id;
        const userId: string = req.body.identity.id

        if(!id || !userId) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }
        const kudo: any = await getKudoById(id);

        if (!kudo.likes.includes(userId)) {
            const value: string[] = kudo.likes;
            value.push(userId);

            const updatedKudo: any = await updateKudo(id, { likes: value })

            if(updatedKudo) {
                return res.status(200).json({
                    message: 'Kudo updated successfully',
                    data: updatedKudo
                }).end();
            } else {
                return res.status(400).json({
                    message: 'Something went wrong when updating kudo',
                })
            }
        } else {
            return res.status(400).json({
                message: 'Kudo already liked'
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const dislikeKudo = async (req: express.Request, res: express.Response) => {
    try {
        const id: string = req.params.id;
        const userId: string = req.body.identity.id

        if(!id || !userId) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }
        const kudo: any = await getKudoById(id);

        if (kudo.likes.includes(userId)) {
            const value: string[] = kudo.likes.filter((item: string) => item !== userId);
            const updatedKudo: any = await updateKudo(id, { likes: value })

            if(updatedKudo) {
                return res.status(200).json({
                    message: 'Kudo updated successfully',
                    data: updatedKudo
                }).end();
            } else {
                return res.status(400).json({
                    message: 'Something went wrong when updating kudo',
                })
            }
        } else {
            return res.status(400).json({
                message: 'Kudo already disliked'
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const collectKudo = async (req: express.Request, res: express.Response) => {
    try {
        const id: string = req.params.id;
        const userId: string = req.body.identity.id

        if(!id || !userId) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }
        const kudo: any = await getKudoById(id);

        if (!kudo.collects.includes(userId)) {
            const value: string[] = kudo.collects;
            value.push(userId);

            const updatedKudo: any = await updateKudo(id, { collects: value })

            if(updatedKudo) {
                return res.status(200).json({
                    message: 'Kudo updated successfully',
                    data: updatedKudo
                }).end();
            } else {
                return res.status(400).json({
                    message: 'Something went wrong when updating kudo',
                })
            }
        } else {
            return res.status(400).json({
                message: 'Kudo already liked'
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

export const disCollectKudo = async (req: express.Request, res: express.Response) => {
    try {
        const id: string = req.params.id;
        const userId: string = req.body.identity.id

        if(!id || !userId) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }
        const kudo: any = await getKudoById(id);

        if (kudo.collects.includes(userId)) {
            const value: string[] = kudo.collects.filter((item: string) => item !== userId);
            const updatedKudo: any = await updateKudo(id, { collects: value })

            if(updatedKudo) {
                return res.status(200).json({
                    message: 'Kudo updated successfully',
                    data: updatedKudo
                }).end();
            } else {
                return res.status(400).json({
                    message: 'Something went wrong when updating kudo',
                })
            }
        } else {
            return res.status(400).json({
                message: 'Kudo already liked'
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}