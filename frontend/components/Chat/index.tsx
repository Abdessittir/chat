import React, { useState } from 'react';

export type ChatType = {
    id: string | number,
    name: string,
};

const Chat = ({ chat }: { chat: ChatType }) => {
    return (
        <li>
            <h3>{chat.name}</h3>
        </li>
    );
};

type ChatState = {
    chats: ChatType[],
    pending: boolean,
};

const Chats = () => {

    const [state, setState] = useState<ChatState>({
        chats: [],
        pending: true,
    });

    return (
        <ul>
            {
                state.chats.map(chat => (
                    <Chat chat={chat} />
                ))
            }
        </ul>
    );
};
export default Chats;
