import React, { memo, useEffect, useRef, useState } from 'react';
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
    const messages = useRef<HTMLDivElement>(null);

    async function fetchChat() {
        try {
            const response = await request(
                `chat/${chatId}`,
                {
                    method: 'get'
                }
            );

            if(response.success) {
                const messages = response.data.chat.messages.map(message => {
                    let data = message;
                    response.data.chat.users.forEach(user => {
                        if(data.userId === user.id) {
                            data = {
                                ...message,
                                username: user.name
                            };
                        }
                    });
                    return data;
                });
                setChat({
                    ...response.data.chat,
                    messages: messages,
                    users: response.data.chat.users.map(user => user.id)
                })
            } else {

            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!messages.current) return;
    
        messages.current.scrollTo({
          left: 0,
          top: messages.current.scrollHeight,
          behavior: "smooth"
        });
    }, [chat.messages]);

    useEffect(() => {
        fetchChat();
        socket.emit('chat', {chatId, userId});
        socket.on('server-message', (message) => {
            setChat(prev => ({
                ...prev,
                messages: [...prev.messages, message]
            }));
        });

        return () => {socket.off('server-message')};
    }, []);

    return (
        <div className="chatroom">
            <div className="chat_info">
                <h1>{chat.name}</h1>
                <img
                    src='../assets/close.png'
                    alt='close chatroom'
                    onClick={close}
                />
            </div>
            <div className="messages" ref={messages}>
                {
                    chat.messages.map((message: MessageType) => (
                        <Message
                           key={message.id}
                           id={message.id}
                           content={message.content}
                           image_url={message.image_url}
                           video_url={message.video_url}
                           username={message.username}
                           user_id={message.userId}
                           owner={message.userId === userId}
                        />
                    ))
                }
            </div>
            <SendMessage
              socket={socket}
              chatId={chatId}
              users={chat.users}
            />
        </div>
    );
};

export default memo(ChatRoom, () => true); //props will never be changed for the lifetime of this component
