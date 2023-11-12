import React from 'react';

import Input from '../Input';
import './index.css';

type Inputs = React.ReactElement<any, React.JSXElementConstructor<typeof Input>>[];

const Form = (
    { children, handleSubmit }
    : { children: Inputs, handleSubmit: (event: React.FormEvent) => void}
) => {
    return (
        <form className="form" onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;