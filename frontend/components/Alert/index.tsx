import React from 'react';
import './index.css';

const Alert = (
    { message, type, clear }
    : { message: string, type: string, clear: () => void }
) => {
    return (
        <div className={type}>
            {message}
            <img
               onClick={clear}
               className='clear'
               src='../assets/close.png'
               alt='close button'
            />
        </div>
    );
}

export default Alert;
