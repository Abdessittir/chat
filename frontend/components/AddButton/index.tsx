import React from 'react';

const AddButton = ({ showPortal, text }) => {
    return (
        <button type="button" onClick={showPortal}>{text}</button>
    )
}

export default AddButton;