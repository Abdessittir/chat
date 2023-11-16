import React, { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './app.css';
import Sidebar from './components/Sidebar';
import StateProvider, { useAppState, useDispatch } from './context';
import Portal from './components/Portal';
import SignIn from './signin';
import SignUp from './signup';
import Header from './components/Header';
import ChatRoom from './components/ChatRoom';
import { CLOSE_CHATROOM } from './context/actionTypes';

export const App = () => {
  const { userPending, chatId, userId, socket } = useAppState(state => ({
    userPending: state.userPending,
    chatId: state.chatId,
    userId: state.user?.id,
    socket: state.socket
  }));
  const dispatch = useDispatch();

  const closeChat = useCallback(() => dispatch({ type: CLOSE_CHATROOM }), []);

  if(userPending) return <h1>pending...</h1>;

  return (
    <div className="app">
      <Header />
      <Sidebar />
      {chatId && 
      <ChatRoom
        chatId={chatId}
        userId={userId}
        socket={socket}
        close={closeChat}
      />}
      <Portal />
    </div>
  );
};


const router = createBrowserRouter([
  {
    path: '/',
    element: <StateProvider><App /></StateProvider>,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
);