import * as React from 'react';
import ReactDOM from 'react-dom/client';

import './app.css';

const Greet = () => {
  return (
    <div>
      <form>
        <button type="submit">sign out</button>
      </form>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Greet />
    </React.StrictMode>,
);