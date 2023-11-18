import React from 'react';
import './index.css';

const Message = ({ id, content, image_url, video_url, username, user_id, owner}) => {
    return (
        <div className="message_container" style={{
            'justifyContent': owner? 'flex-end': 'flex-start',
        }}>
            <p className="message_text" style={{
                'backgroundColor': !owner? 'lightgray': 'rgb(7, 146, 7)',
                'color': !owner? 'rgb(7, 146, 7)': 'white'
            }}>{content}</p>
            <p className="message_user">{username}</p>
        </div>
    );
};
export default Message;
