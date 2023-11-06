import React from 'react';

const AddButton = ({ showPortal, text }: { showPortal: () => void, text: string }) => {
    return (
        <button type="button" onClick={showPortal}>{text}</button>
    )
}

export default AddButton;