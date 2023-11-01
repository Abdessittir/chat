import express from 'express';
import { Server } from 'socket.io';
import session from 'express-session';
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


const sess = {
    secret: 'keyboard cat',
    cookie: {
        secure: false,
    },
    saveUninitialized: true,
    authenticated: false,
}
  
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}
  
app.use(session(sess));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.use(authRouter);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

export { server, io };
