import React from 'react';

type Contact = {
    id: string | number,
    email: string,
    name: string,
};

const Contact = ({ contact }:{ contact: Contact}) => {
    return (
        <li>
            <h3>{contact.name}</h3>
            <h4>{contact.email}</h4>
        </li>
    );
};