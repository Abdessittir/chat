import express, { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';
import session, { SessionOptions } from 'express-session';
import cookieParser from 'cookie-parser';

import { createServer } from 'node:http';
import { join } from 'node:path';

import authRouter from './routes/auth';
import userRouter from './routes/user';
import chatRouter from './routes/chat';
import prisma from './prisma/db';


const app = express();
const server = createServer(app);
const io = new Server(server);

type Notification = {
    chatId: number,
    count: number,
};

const notifications = new Map<number, Notification[]>();

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('get-notifications', (userId) => {
        socket.join(userId);

        const nots = notifications.get(userId);
        if(nots) {
            io.to(userId).emit('initial-notifications', nots);
        } else  {
            notifications.set(userId, []);
        }
    });

    socket.on('chat', ({chatId, userId}) => {
        socket.join(chatId);
        const nots = notifications.get(userId) as Notification[];
        notifications.set(userId, nots?.filter(not => not.chatId !== chatId));
        io.to(userId).emit('clear-notification', chatId);
    });

    socket.on('client-message', async ({ message, users, chatId, userId }) => {
        try {
            const createdMessage = await prisma.message.create({
                data: {
                    ...message,
                    chatId,
                    userId
                },
            });
            io.to(chatId).emit('server-message', createdMessage);
        } catch(err) {
            console.log(err);

        }

        users.forEach((userId: any) => {
            const nots = notifications.get(userId);
            if(!nots) return;

            nots.forEach(notification => {
                if(notification.chatId === chatId) {
                    io.to(userId).emit('notification', chatId);
                }
            });
        });
    });
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
app.use(chatRouter);
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


export { server, io };
