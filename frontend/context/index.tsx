import React, { createContext, useContext, useReducer } from 'react';

import { ContactType } from '../components/Contact';
import { App } from '../app';


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

type StateType = {
    contacts: ContactType[],
    chatId: number | null,
    user: UserType,
    portal: {
        addChat: boolean,
        addContact: boolean,
    }
};

const initialState: StateType = {
    contacts: [],
    chatId: null,
    portal: {
        addChat: false,
        addContact: false,
    },
    user: {
        id: 0,
        name: '',
        email: '',
        photo: '',
    }
};

const StateContext = createContext<StateType>(initialState);

export function useAppState() {
    return useContext(StateContext);
};

type Action = {
    payload: any,
    type: string,
};

function reducer(state: StateType, action: Action): StateType {
    return initialState;
}

type App = React.ReactElement<any, React.JSXElementConstructor<typeof App>>;
export default function StateProvider({ children }: { children: App }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={state}>
            {children}
        </StateContext.Provider>
    );
}