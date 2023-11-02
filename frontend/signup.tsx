import * as React from 'react';
import ReactDOM from 'react-dom/client';

import './app.css';

const SignUp = () => {
  return (
    <div>
      <h1>SignUp</h1>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SignUp />
    </React.StrictMode>,
);