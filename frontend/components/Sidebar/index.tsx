import React, { useState } from 'react';
import Chats from '../Chat';
import Contacts from '../Contact';
import AddButton from '../AddButton';


const Sidebar = () => {
    const [state, setState] = useState({
        chats: [],
        contacts: [],
        default: true,
        pending: true
    });

    const Items = state.default ? <Chats /> : <Contacts />

    return (
        <aside>
            <h2>{state.default ? 'Chats' : 'Contacts'}</h2>
            {Items}
            <AddButton />
        </aside>
    );
};
export default Sidebar;
