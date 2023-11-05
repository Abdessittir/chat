import React, { createContext, useContext, useReducer } from 'react';

import { App } from '../app';
import {
    CHAT_PORTAL,
    CONTACT_PORTAL
} from './actionTypes';


export type UserType = {
    id: number,
    name: string,
    email: string,
    photo?: string,
};

export type Message = {
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
    messages: Message[]
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
    user: UserType,
    addChat: boolean,
    addContact: boolean,
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
    user: {
        id: 0,
        name: '',
        email: '',
        photo: '',
    }
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
        case CHAT_PORTAL:
            return { ...state, addChat: true, addContact: false };
        case CONTACT_PORTAL:
            return { ...state, addChat: false, addContact: true};
        default:
            return initialState;
    }
}

type App = React.ReactElement<any, React.JSXElementConstructor<typeof App>>;
export default function StateProvider({ children }: { children: App }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
}