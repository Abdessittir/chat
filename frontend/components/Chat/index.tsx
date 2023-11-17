import React, { useEffect } from 'react';
import { ChatType, useAppState, useDispatch } from '../../context';
import './index.css';
import { SET_CHATROOM } from '../../context/actionTypes';

const Chat = ({ chat }: { chat: ChatType }) => {
    const dispatch = useDispatch();
    return (
        <li onClick={() => dispatch({ type: SET_CHATROOM, payload: chat.id })}>
            <h3>{chat.name}</h3>
        </li>
    );
};

const Chats = () => {

    const chats = useAppState(state => state.chats);
    const socket = useAppState(state => state.socket);

    useEffect(() => {
        socket.emit('get-notifications');
        socket.on('initial-notifications', (notifications) => {
            console.log(notifications);
        });
        socket.on('notification', (chatId) => {
            console.log(chatId);
        });
    }, []);

    return (
        <ul className="list">
            {
                chats.map((chat: ChatType) => (
                    <Chat key={chat.id} chat={chat} />
                ))
            }
        </ul>
    );
};
export default Chats;
