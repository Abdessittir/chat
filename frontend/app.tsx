import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './app.css';
import Sidebar from './components/Sidebar';
import StateProvider, { useAppState } from './context';
import Portal from './components/Portal';
import SignIn from './signin';
import SignUp from './signup';
import Header from './components/Header';

export const App = () => {
  const {user, userPending} = useAppState(
    state => ({user: state.user, userPending: state.userPending})
  );

  if(userPending) return <h1>pending...</h1>;

  return (
    <div>
      <Header />
      <Sidebar />
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