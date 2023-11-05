import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom';

import './app.css';
import Sidebar from './components/Sidebar';
import StateProvider from './context';
import Portal from './components/Portal';

export const App = () => {
  return (
    <div>
      <Sidebar />
      <Portal />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <StateProvider>
        <App />
      </StateProvider>
    </React.StrictMode>,
);