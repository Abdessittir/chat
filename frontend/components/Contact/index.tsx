import React from 'react';
import { ContactType, useAppState } from '../../context';

const Contact = ({ contact }:{ contact: ContactType}) => {
    return (
        <li>
            <h3>{contact.name}</h3>
            <h4>{contact.email}</h4>
        </li>
    );
};

const Contacts = () => {
    const contacts = useAppState(state => state.contacts);
    return (
        <ul>
            {
                contacts.map((contact: ContactType) => (
                    <Contact contact={contact} />
                ))
            }
        </ul>
    );
};

export default Contacts;
