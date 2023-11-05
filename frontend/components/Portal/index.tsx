import React, { useState } from 'react';
import Form from '../Form';
import Input from '../Input';
import { useAppState } from '../../context';

const AddContact = () => {
    const [state, setState] = useState({
        email: '',
    });

    const handleSubmit = (event: React.FormEvent) => {};
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <div>
            <Form handleSubmit={handleSubmit}>
                <Input
                   label='Email'
                   options={{
                    type: 'email',
                    name: 'email',
                    value: state.email,
                    onChange: handleChange,
                    placeholder: 'Contact email',
                   }}
                />
                <Input
                    label=''
                    options={{
                        type: 'submit',
                        name: 'submit',
                        placeholder: '',
                        value: 'Add Contact',
                        onChange: () => { }
                    }}
                />
            </Form>
        </div>
    );
};

const AddChat = () => {
    const [state, setState] = useState({
        name: '',
    });

    const handleSubmit = (event: React.FormEvent) => {};
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <div>
            <Form handleSubmit={handleSubmit}>
                <Input
                   label='Chat'
                   options={{
                    type: 'text',
                    name: 'name',
                    value: state.name,
                    onChange: handleChange,
                    placeholder: 'Chat Name',
                   }}
                />
                <Input
                    label=''
                    options={{
                        type: 'submit',
                        name: 'submit',
                        placeholder: '',
                        value: 'Add Chat',
                        onChange: () => { }
                    }}
                />
            </Form>
        </div>
    );
};


const Portal = () => {
    const addChat = useAppState(state => state.addChat);
    const addContact = useAppState(state => state.addContact);
    return (
        <div>
            {addContact && <AddContact />}
            {addChat && <AddChat />}
        </div>
    );
};

export default Portal;
