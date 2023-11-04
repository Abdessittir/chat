import React, { useState } from 'react';
import Form from '../Form';
import Input from '../Input';

type FormComponent = React.ReactElement<any, React.JSXElementConstructor<typeof Form>>;

const Portal = ({ children } : { children: FormComponent }) => {
    return (
        <div>
            {children}
        </div>
    );
};

const AddContact = () => {
    const [state, setState] = useState({
        email: '',
    });

    const handleSubmit = (event: React.FormEvent) => {};
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <Portal>
            <Form handleSubmit={handleSubmit} url=''>
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
        </Portal>
    );
};

const AddChat = () => {
    const [state, setState] = useState({
        name: '',
    });

    const handleSubmit = (event: React.FormEvent) => {};
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    return (
        <Portal>
            <Form handleSubmit={handleSubmit} url=''>
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
                        value: 'Add Contact',
                        onChange: () => { }
                    }}
                />
            </Form>
        </Portal>
    );
};

export default { AddContact, AddChat };
