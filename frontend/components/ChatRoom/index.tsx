import React, { memo, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import SendMessage from '../SendMessage';
import Message from '../Message';
import { ChatMessagesType, MessageType } from '../../context';

import './index.css';
import request from '../../service/request';

const ChatRoom = (
    { chatId, userId, socket, close }
    :{ 
        chatId: number,
        userId: number,
        socket: Socket<DefaultEventsMap, DefaultEventsMap>,
        close: () => void
    }
) => {

    const [chat, setChat] = useState<ChatMessagesType>({
        id: chatId,
        name: '',
        messages: [],
        users: []
    });

    async function fetchChat() {
        try {
            const response = await request(
                `chat/${chatId}`,
                {
                    method: 'get'
                }
            );

            if(response.success) {
                console.log(response.data.chat);
                setChat(response.data.chat)
            } else {

            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchChat();
        socket.emit('chat', {chatId, userId});
        socket.on('server-message', (message) => {
            console.log(message);
        });
    }, []);

    return (
        <div className="chatroom">
            <img
               src='../assets/close.png'
               alt='close chatroom'
               onClick={close}
            />
            <div>
                {
                    chat.messages.map((message: MessageType) => (
                        <Message
                           key={message.id}
                           id={message.id}
                           content={message.content}
                           image_url={message.image_url}
                           video_url={message.video_url}
                           username={message.username}
                           user_id={message.user_id}
                        />
                    ))
                }
            </div>
            <SendMessage
              socket={socket}
              chatId={chatId}
              userId={userId}
              users={chat.users}
            />
        </div>
    );
};

export default memo(ChatRoom, () => true); //props will never change for the lifetime of this component
