import express from "express";
import { getKudos, getKudoById, createKudo, deleteKudo, updateKudo } from "../db/kudos";


export const getAllKudos = async (req: express.Request, res: express.Response) => {
    try {
        const allKudos: any = await getKudos();

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

export const createNewKudo = async (req: express.Request, res: express.Response) => {
    try {
        const { sender, receiver, message, kudoGif } = req.body;
        
        if(!sender || !receiver || !message || !kudoGif) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const newKudo: any = await createKudo({
            sender,
            receiver,
            message,
            kudoGif
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

export const updateLikes = async (req: express.Request, res: express.Response) => {
    try {
        const id: string = req.params.id;
        const { likes } = req.body;

        if(!likes) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const updatedKudo: any = await updateKudo(id, { likes })

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

    } catch(error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}