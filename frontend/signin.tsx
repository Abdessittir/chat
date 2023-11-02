import * as React from 'react';
import ReactDOM from 'react-dom/client';

import './app.css';

const SignIn = () => {
  return (
    <div>
      <h1>SignIn</h1>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SignIn />
    </React.StrictMode>,
);
