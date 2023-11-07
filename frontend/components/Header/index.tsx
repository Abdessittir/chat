import React from 'react';
import { useAppState } from '../../context';
import UserInfo from '../UserInfo';

const Header = () => {
    const user = useAppState(state => state.user);
    const url = user?.photo ?? '';
    return (
        <header>
            <h1>Chat App</h1>
            <div>
                <img
                   src={url}
                   alt={user?.name}
                />
            </div>
            <UserInfo user={user} />
        </header>
    );
};

export default Header;
