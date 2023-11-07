import React from 'react';
import request from '../../service/request';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ user }: { user: { name: string, email: string } }) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        const response = await request(
            '/auth/signout',
            { method: 'delete' }
        );
        navigate('/signin');
    };

    return (
        <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <button type="button" onClick={handleClick}>
                Logout
            </button>
        </div>
    );
};

export default UserInfo;
