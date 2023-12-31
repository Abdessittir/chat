import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/db';

import crypto from 'crypto';

const signin = async (req: Request, res: Response, next: NextFunction) => {
  
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if(!user) {
            return res
                    .status(404)
                    .send({
                        succes: false,
                        error: `Can't find user with email ${email}`,
                        data: null,
                    });
        }

        crypto.pbkdf2(password, user!.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return next(err); }
            if (!crypto.timingSafeEqual(user!.hashed_password, hashedPassword)) {
                return res
                      .status(404)
                      .send({
                        success: false,
                        error: `Incorrect password`,
                        data: null
                      });
            }
            (req.session as any).user = user!.id;
            res.status(200).send({
                success: true,
                error: null,
                data: null
            });
        });

    } catch (err) {
        next(err);
    }
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashed_password) => {
        if (err) { return next(err); }
        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    hashed_password,
                    salt
                }
            });

            (req.session as any).user = user.id;
            res.status(201).send({
                success: true,
                error: null,
                data: null
            });
        } catch (err) {
            next(err);
        }
    });
};

const signout = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => next(err));
    res.status(200).send({
        success: true,
        error: null,
        data: null
    });
};

export { signin, signup, signout };
