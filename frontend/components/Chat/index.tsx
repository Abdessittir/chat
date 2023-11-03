import React from 'react';

type Chat = {
    id: string | number,
    name: string,
};

const Chat = ({ chat }: { chat: Chat }) => {
    return (
        <li>
            <h3>{chat.name}</h3>
        </li>
    );
};
export default Chat;
