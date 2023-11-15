import React, { memo } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import SendMessage from '../SendMessage';

import './index.css';

const ChatRoom = (
    { chatId, socket, close }
    :{ chatId: number, socket: Socket<DefaultEventsMap, DefaultEventsMap>, close: () => void }
) => {

    return (
        <div className="chatroom">
            <img
               src='../assets/close.png'
               alt='close chatroom'
               onClick={close}
            />
            <SendMessage />
        </div>
    );
};

export default memo(ChatRoom, () => true); //props will never change for the lifetime of this component
