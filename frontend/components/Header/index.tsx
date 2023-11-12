import React, { useState } from 'react';
import { useAppState } from '../../context';
import UserInfo from '../UserInfo';

import './styles.css';

const Header = () => {
    const user = useAppState(state => state.user);
    const [showInfo, setShowInfo] = useState(false);
    const url = user?.photo ?? '../assets/person.png';
    return (
        <header className="header">
            <h1>Chat App</h1>
            <div
              onClick={() => setShowInfo(prev => !prev)}
              className="avatar"
            >
                <img
                   src={url}
                   alt={user?.name}
                />
                {showInfo && <UserInfo user={user} />}
            </div>
        </header>
    );
};

export default Header;
