import React, { useState } from 'react';
import Form from '../Form';
import Input from '../Input';
import { useAppState, useDispatch } from '../../context';
import './index.css';
import { ADD_CONTACT, CLOSE_PORTAL } from '../../context/actionTypes';
import request from '../../service/request';
import Alert from '../Alert';
import CheckBox from '../CheckBox';

const AddContact = () => {
    const [state, setState] = useState({
        email: '',
        alertType: '',
        message: '',
        disabled: false,
    });
    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setState(prev => ({ ...prev, disabled: true }));

        const response = await request('/user/add_contact', {
            method: 'put',
            body: JSON.stringify({
                email: state.email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.success) {
            setState(prev => ({
                ...prev,
                alertType: 'success',
                message: 'Contact added!',
                disabled: false,
            }));
            dispatch({
                type: ADD_CONTACT,
                payload: response.data.contact
            });
        } else {
            setState(prev => ({
                ...prev,
                alertType: 'error',
                message: response.error,
                disabled: false,
            }));
        }
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

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
                        onChange: () => { },
                        disabled: state.disabled,
                    }}
                />
            </Form>
            {
                state.alertType && <Alert
                   type={state.alertType}
                   message={state.message}
                   clear={() => setState(prev => ({ ...prev, alertType: '', message: ''}))}
                />
            }
        </div>
    );
};

const AddChat = () => {
    const contacts = useAppState(state => state.contacts);
    const user = useAppState(state => state.user);

    const [name, setName] = useState('');
    const [userIds, setUserIds] = useState<number[] | string[]>([ user.id ]);
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if(!name || userIds.length <= 0) return;
    };

    const ChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const changeUsers = (id: string | number) => {
        setUserIds((prev: any[]) => {
            if(prev.includes(id)) {
                console.log('found')
                return prev.filter(item => item !== id);
            } else  {
                return [...prev, id];
            }
        });
    };


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
                    value: name,
                    onChange: ChangeName,
                    placeholder: 'Chat Name',
                   }}
                />
                {
                    contacts.map(contact => (
                        <CheckBox
                           key={contact.id}
                           label={contact.email}
                           options={{
                            type: 'checkbox',
                            name: contact.name,
                            value: contact.id,
                            onChange: () => changeUsers(contact.id),
                           }}
                        />
                    ))
                }
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
