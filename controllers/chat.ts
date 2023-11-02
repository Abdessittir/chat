import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/db';

const createChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, userIDs } = req.body;
        const chat = await prisma.chat.create({
            data: {
                name,
                users: {
                    connect: userIDs
                }
            },
        });
        res.status(201).send({ chat });
    } catch(err) {
        next(err);
    }
};

export { createChat };