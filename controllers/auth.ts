import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/db';

import crypto from 'crypto';

const signin = async (req: Request, res: Response) => {
    // crypto.pbkdf2(password, user!.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    //     if (err) { return cb(err); }
    //     if (!crypto.timingSafeEqual(user!.hashed_password, hashedPassword)) {
    //       return cb(null, false, { message: 'Incorrect password.' });
    //     }
    //     return cb(null, user ?? undefined);
    // });
  
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });
    } catch (err) {
        console.log(err);
    }
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashed_password) => {
        if (err) { return next(err); }
        try {
            const hashed_password = password;
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    hashed_password,
                    salt
                }
            });

            req.session.user = user.id;
            req.session.authenticated = true;
        } catch (err) {
            console.log(err);
        }
    });
};

export { signin, signup };
