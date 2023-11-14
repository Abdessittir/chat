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


export { createChat };