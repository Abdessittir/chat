import React, { useCallback, useEffect, useState } from 'react';
import { ChatType, useAppState, useDispatch } from '../../context';
import './index.css';
import { SET_CHATROOM } from '../../context/actionTypes';
import { Notification } from '../../../app';

const Chat = (
    { chat, notificationCount }
    : { chat: ChatType, notificationCount: number }
) => {
    const dispatch = useDispatch();
    return (
        <li
          className="chat_name"
          onClick={() => dispatch({ type: SET_CHATROOM, payload: chat.id })}
        >
            {chat.name}
            {notificationCount > 0 && <div className="notifications">{notificationCount}</div>}
        </li>
    );
};

const Chats = () => {

    const chats = useAppState(state => state.chats);
    const socket = useAppState(state => state.socket);
    const user = useAppState(state => state.user);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const getNotificationCount = useCallback((chatId: number | string, notis: Notification[]) => {
        let count = 0;
        notis.forEach(noti => {
            if(noti.chatId == chatId) { count = noti.count };
        });
        return count;
    }, []);

    useEffect(() => {
        socket.emit('get-notifications', user.id);
        socket.on('initial-notifications', (notifications: Notification[]) => {
            setNotifications(notifications);
        });
        socket.on('notification', (chatId) => {
            setNotifications(prev => prev.map(noti => {
                if(noti.chatId === chatId) {
                    return {
                        ...noti,
                        count: noti.count + 1
                    };
                };
                return noti;
            }));
        });

        socket.on('clear-notification', (chatId) => {
            console.log('clear-notification')
            setNotifications(prev => prev.map(noti => {
                if(noti.chatId === chatId) {
                    return {
                        ...noti,
                        count: 0
                    };
                };
                return noti;
            }));
        });

        return () => {
            socket.off('initial-notifications');
            socket.off('notification');
            socket.off('clear-notification');
        }
    }, []);

    return (
        <ul className="list">
            {
                chats.map((chat: ChatType) => (
                    <Chat
                       key={chat.id}
                       chat={chat}
                       notificationCount={getNotificationCount(chat.id, notifications)}
                    />
                ))
            }
        </ul>
    );
};
export default Chats;
