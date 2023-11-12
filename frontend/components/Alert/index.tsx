import React from 'react';
import './index.css';

const Alert = (
    { message, type, clear }
    : { message: string, type: string, clear: () => void }
) => {
    return (
        <div className={type}>
            {message}
            <button className="clear_alert" type="button" onClick={clear}>
                clear
            </button>
        </div>
    );
}

export default Alert;
