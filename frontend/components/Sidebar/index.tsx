import React, { useState } from 'react';
import Chats from '../Chat';
import Contacts from '../Contact';
import AddButton from '../AddButton';
import { useDispatch } from '../../context';
import {
    CHAT_PORTAL,
    CONTACT_PORTAL
} from '../../context/actionTypes';


const Sidebar = () => {
    const [defaultView, setDefaultView] = useState(true);

    const dispatch = useDispatch();
    const show = () => {
        let action = {
            type: CHAT_PORTAL,
        };
        if(!defaultView) {
            action.type = CONTACT_PORTAL;      
        }
        dispatch(action);
    };

    const Items = defaultView ? <Chats /> : <Contacts />

    return (
        <aside>
            <div>
                <h2 onClick={() => setDefaultView(true)}>Chats</h2>
                <h2 onClick={() => setDefaultView(false)}>Contacts</h2>
            </div>
            {Items}
            <AddButton
              text={defaultView ? 'Add Chat' : 'Add Contact'}
              showPortal={show}
            />
        </aside>
    );
};
export default Sidebar;
