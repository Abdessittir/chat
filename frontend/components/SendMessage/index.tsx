import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import Form from  '../Form';
import Input from '../Input';

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
        })
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    };

    return (
        <Form handleSubmit={handleSubmit}>
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
            <button type="submit">Send</button>
        </Form>
    );
}

export default SendMessage;
