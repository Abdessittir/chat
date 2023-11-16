import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { App } from '../app';
import {
    CHAT_PORTAL,
    CONTACT_PORTAL,
    SET_USER,
    CLOSE_PORTAL,
    ADD_CONTACT,
    ADD_CHAT,
    SET_CHATROOM,
    CLOSE_CHATROOM,
} from './actionTypes';
import request from '../service/request';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';


export type UserType = {
    id: number,
    name: string,
    email: string,
    photo?: string,
};

export type MessageType = {
    id: number,
    content?: string,
    image_url?: string,
    video_url?: string,
    username: string,
    user_id: number,
};

export type ChatMessagesType = {
    id: string | number,
    name: string,
    messages: MessageType[]
};

export type ChatType = {
    id: string | number,
    name: string,
};

export type ContactType = {
    id: string | number,
    email: string,
    name: string,
};

type StateType = {
    contacts: ContactType[],
    chats: ChatType[],
    chatId: number | null,
    user: UserType | null,
    addChat: boolean,
    addContact: boolean,
    userPending: boolean,
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>
};

type Action = {
    payload?: any,
    type: string,
};

type Dispatcher = React.Dispatch<Action>;

const initialState: StateType = {
    contacts: [],
    chats: [],
    chatId: null,
    addChat: false,
    addContact: false,
    user: null,
    userPending: true,
};

type AppState = {
    state: StateType,
    dispatch?: Dispatcher,
};


const StateContext = createContext<AppState>({state: initialState});

export function useAppState(selector : (state: StateType) => any) {
    return selector(useContext(StateContext).state);
};

export function useDispatch() {
    return useContext(StateContext).dispatch as Dispatcher;
}


function reducer(state: StateType, action: Action): StateType {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                userPending: false,
                user: action.payload.user,
                chats: action.payload.chats,
                contacts: action.payload.contacts,
                socket: action.payload.socket
            };
        case CHAT_PORTAL:
            return { ...state, addChat: true, addContact: false };
        case CONTACT_PORTAL:
            return { ...state, addChat: false, addContact: true};
        case CLOSE_PORTAL:
            return { ...state, addChat: false, addContact: false };
        case ADD_CONTACT:
            return { ...state, contacts: [...state.contacts, action.payload]};
        case ADD_CHAT:
            return { ...state, chats: [...state.chats, action.payload ]};
        case SET_CHATROOM:
            return { ...state, chatId: action.payload };
        case CLOSE_CHATROOM:
            return { ...state, chatId: null };
        default:
            return initialState;
    }
}

type App = React.ReactElement<any, React.JSXElementConstructor<typeof App>>;
export default function StateProvider({ children }: { children: App }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    async function fetchData() {
        const profile = await request(
            '/user/profile',
            {
                method: 'get',
            },
        );
        if(profile.success) {
            dispatch({
                type: SET_USER,
                payload: {
                    user: profile.data.user,
                    contacts: profile.data.contacts,
                    chats: profile.data.chats,
                    socket: io()
                }
            });
        } else {
            navigate('/signin');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
}