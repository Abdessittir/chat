import express, { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';
import session, { SessionOptions } from 'express-session';
import cookieParser from 'cookie-parser';

import { createServer } from 'node:http';
import { join } from 'node:path';

import authRouter from './routes/auth';
import userRouter from './routes/user';
import seed from './prisma/seed';


const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
});


const sess: SessionOptions = {
    secret: 'keyboard cat',
    cookie: {
        secure: false,
        sameSite: true,
        maxAge: 3600000 * 24 // 24 hours 
    },
    saveUninitialized: true,
    resave: true,
}
  
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie!.secure = true // serve secure cookies
}
  
app.use(session(sess));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.use(authRouter);
app.use(userRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({
        success: false,
        error: err.message,
        data: null,
    });
});

app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, './views/home.html'));
});

seed();

export { server, io };
