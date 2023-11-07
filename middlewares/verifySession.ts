import { Request, Response, NextFunction } from 'express';

const verifySession = (req: Request, res: Response, next: NextFunction) => {
    if(!(req.session as any).user) {
        return res.status(403).send({
            success: false,
            error: 'Unauthorized!',
            data: null
        });
    }

    next();
};

export default verifySession;