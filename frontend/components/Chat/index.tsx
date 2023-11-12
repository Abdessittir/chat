import React from 'react';
import { ChatType, useAppState } from '../../context';
import './index.css';

const Chat = ({ chat }: { chat: ChatType }) => {
    return (
        <li>
            <h3>{chat.name}</h3>
        </li>
    );
};

const Chats = () => {

    const chats = useAppState(state => state.chats);

    return (
        <ul className="list">
            {
                chats.map((chat: ChatType) => (
                    <Chat chat={chat} />
                ))
            }
        </ul>
    );
};
export default Chats;
