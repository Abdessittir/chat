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

export { getChats };
