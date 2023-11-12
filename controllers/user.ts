import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/db';

const getChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: (req.session as any).user
            },
            include: { chats: true }
        });
        res.status(200).send({ chats: user?.chats });
    } catch (err) {
        next(err);
    }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: (req.session as any).user
            }
        });
        if(!user) {
            res.status(404).send({
                success: false,
                error: 'User not found',
                data: null
            });
        }

        res.status(200).send({
            success: true,
            error: null,
            data: {
                user: {
                    id: user?.id,
                    name: user?.name,
                    email: user?.email,
                    photo: user?.photo
                } 
            }
        });
    } catch(err) {
        next(err);
    }
};

const addContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const contact = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if(!contact) {
            return res.status(400).send({
                success: false,
                error: `Can't find user with email ${email}`,
                data: null
            });
        }

        const user = await prisma.user.update({
            where: {
                id: (req.session as any).user
            },
            data: {
               contacts: {
                push: contact?.id
               } 
            }
        });

        res.status(201).send({
            success: true,
            error: null,
            data: {
                contact: {
                    id: contact?.id,
                    email: contact?.email,
                    name: contact?.name
                }
            }
        });
    } catch(err) {
        next(err);
    }
};

export { getChats, getProfile, addContact };
