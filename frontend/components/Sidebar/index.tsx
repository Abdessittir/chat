import React, { useState } from 'react';
import Chats from '../Chat';
import Contacts from '../Contact';
import { useDispatch } from '../../context';
import {
    CHAT_PORTAL,
    CONTACT_PORTAL
} from '../../context/actionTypes';
import './index.css';


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
        <aside className="sidebar">
            <div className="sidebar_titles">
                <h2
                  onClick={() => setDefaultView(true)}
                  className={`chats_title ${defaultView? 'selected': ''}`}
                >Chats</h2>
                <h2
                  onClick={() => setDefaultView(false)}
                  className={`contacts_title ${!defaultView? 'selected': ''}`}
                >Contacts</h2>
            </div>
            {Items}
            <button className="add_btn" type="button" onClick={show}>
                {defaultView ? 'Add Chat' : 'Add Contact'}
            </button>
        </aside>
    );
};
export default Sidebar;
