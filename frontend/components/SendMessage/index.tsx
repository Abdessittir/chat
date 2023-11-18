import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import Form from  '../Form';
import Input from '../Input';
import './index.css';

const SendMessage = (
    { socket, chatId, userId, users }
    :{
        socket: Socket<DefaultEventsMap, DefaultEventsMap>,
        chatId: number,
        userId: number
        users: number[]
    }
) => {
    const [message, setMessage] = useState({
        content: ''
    });
    const handleSubmit= (event: React.FormEvent) => {
        event.preventDefault();
        socket.emit('client-message', {
            chatId,
            userId,
            message,
            users
        });
        setMessage({
            content: ''
        });
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    };

    return (
        <Form handleSubmit={handleSubmit} className="send_form">
            <Input
               label=''
               options={{
                type: 'text',
                name: 'content',
                placeholder: 'Type your message',
                value: message.content,
                onChange: handleChange
               }}
            />
            <button className="send_btn" type="submit">Send</button>
        </Form>
    );
}

export default SendMessage;
