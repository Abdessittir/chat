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

export { getChats, getProfile };
