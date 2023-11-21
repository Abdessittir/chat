import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import Form from  '../Form';
import Input from '../Input';
import './index.css';
import { useAppState } from '../../context';

const SendMessage = (
    { socket, chatId, users }
    :{
        socket: Socket<DefaultEventsMap, DefaultEventsMap>,
        chatId: number,
        users: number[]
    }
) => {
    const [message, setMessage] = useState({
        content: ''
    });
    const [typing, setTyping] = useState({
        id: '',
        name: ''
    });
    const user = useAppState(state => state.user);

    const handleSubmit= (event: React.FormEvent) => {
        event.preventDefault();
        socket.emit('client-message', {
            chatId,
            message,
            users,
            userId: user.id,
        });
        setMessage({
            content: ''
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    useEffect(() => {
        socket.on('typing', (user) => {
            setTyping(user);
        });
        socket.on('typing-ended', () => {
            setTyping({
                id: '',
                name: '',
            })
        });

        () => {
            socket.off('typing');
            socket.off('typing-ended')
        };
    }, []);

    useEffect(() => {
        if(message.content) {
            socket.emit('client-typing', { chatId, user: { id: user.id, name: user.name } });
        } else {
            socket.emit('client-typing-ended', chatId);
        }
    }, [message.content]);

    return (
        <Form handleSubmit={handleSubmit} className="send_form">
            <p className="typing">
                {typing.id && typing.id !== user.id ? `${typing.name} is typing...`: ''}
            </p>
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
