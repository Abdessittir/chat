import express, { Request, Response } from 'express';
import { Server } from 'socket.io';
import session, { SessionOptions } from 'express-session';
import cookieParser from 'cookie-parser';

import { createServer } from 'node:http';
import { join } from 'node:path';

import authRouter from './routes/auth';


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

app.get('/', (req: Request, res: Response) => {

    if(!(req.session as any).user) {
        return res.redirect('/signin');
    }
    res.sendFile(join(__dirname, './views/home.html'));
});


app.get('/signin', (req, res) => {

    if((req.session as any).user) {
        return res.redirect('/');
    }
    res.sendFile(join(__dirname, './views/signin.html'));
});

app.get('/signup', (req, res) => {

    if((req.session as any).user) {
        return res.redirect('/');
    }
    res.sendFile(join(__dirname, './views/signup.html'));
});

import prisma from './prisma/db';
async function main() {
    const users = await prisma.user.findMany();
    console.log(users);
}

main();
export { server, io };
