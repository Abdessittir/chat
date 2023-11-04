import React, { useState } from 'react';

export type ContactType = {
    id: string | number,
    email: string,
    name: string,
};

const Contact = ({ contact }:{ contact: ContactType}) => {
    return (
        <li>
            <h3>{contact.name}</h3>
            <h4>{contact.email}</h4>
        </li>
    );
};

type ContactState = {
    contacts: ContactType[],
    pending: boolean,
};

const Contacts = () => {
    const [state, setState] = useState<ContactState>({
        contacts: [],
        pending: true,
    });

    return (
        <ul>
            {
                state.contacts.map(contact => (
                    <Contact contact={contact} />
                ))
            }
        </ul>
    );
};

export default Contacts;
