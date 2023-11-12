import React, { useState } from 'react';
import Form from '../Form';
import Input from '../Input';
import { useAppState, useDispatch } from '../../context';
import './index.css';
import { CLOSE_PORTAL } from '../../context/actionTypes';

const AddContact = () => {
    const [state, setState] = useState({
        email: '',
    });
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent) => {};
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <div className="form_container">
            <button
              className="close_portal"
              onClick={() => dispatch({ type: CLOSE_PORTAL })}
            >close</button>
            <h2>Add Contact</h2>
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
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent) => {};
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <div className="form_container">
            <button
              className="close_portal"
              onClick={() => dispatch({ type: CLOSE_PORTAL })}
            >close</button>
            <h2>Add Chat</h2>
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

    if(!addChat && !addContact) return null;
    return (
        <div className="portal">
            {addContact && <AddContact />}
            {addChat && <AddChat />}
        </div>
    );
};

export default Portal;
