import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom';

import './app.css';
import Portal from './components/Portal';

export const App = () => {
  return (
    <div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
);