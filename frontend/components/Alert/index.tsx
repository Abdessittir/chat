import React from 'react';

const Alert = (
    { message, type, clear }
    : { message: string, type: string, clear: () => void }
) => {
    return (
        <div className={type}>
            {message}
            <button type="button" onClick={clear}>clear</button>
        </div>
    );
}

export default Alert;
