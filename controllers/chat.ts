import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/db';

const createChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, userIds } = req.body;
        const chat = await prisma.chat.create({
            data: {
                name,
                users: {
                    connect: userIds.map((userId: number) => ({ id: userId }))
                }
            },
        });
        res.status(201).send({
            success: true,
            error: null,
            data: {
                chat
            }
        });
    } catch(err) {
        next(err);
    }
};

const getChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const chat = await prisma.chat.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                messages: true,
                users: true,
            }
        });

        if(!chat) {
            return res.status(404).send({
                success: false,
                error: 'Chat Not found',
                data: null
            });
        }

        res.status(200).send({
            success: true,
            error: null,
            data: {
                chat,
                users: chat.users.map(user => ({ id: user.id, name:  user.name }))
            }
        });
    } catch(err) {
        next(err);
    }
};


export { createChat, getChat };