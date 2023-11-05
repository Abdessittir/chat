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
    const [state, setState] = useState({
        default: true,
        pending: true
    });

    const dispatch = useDispatch();
    const show = () => {
        let action = {
            type: CHAT_PORTAL,
        };
        if(!state.default) {
            action.type = CONTACT_PORTAL;      
        }
        dispatch(action);
    };

    const Items = state.default ? <Chats /> : <Contacts />

    return (
        <aside>
            <h2>{state.default ? 'Chats' : 'Contacts'}</h2>
            {Items}
            <AddButton
              text={state.default ? 'Add Chat' : 'Add Contact'}
              showPortal={show}
            />
        </aside>
    );
};
export default Sidebar;
