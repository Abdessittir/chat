import React, { useState } from 'react';

import Form from  '../Form';
import Input from '../Input';

const SendMessage = () => {
    const [message, setMessage] = useState({
        content: ''
    });
    const handleSubmit= (event: React.FormEvent) => {};
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

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
