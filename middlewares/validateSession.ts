import { Request, Response, NextFunction } from 'express';

export const validateSession = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    console.log(cookies);
    next();
};