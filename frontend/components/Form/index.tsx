import React from 'react';

import Input from '../Input';
import './index.css';

type Inputs = React.ReactElement<any, React.JSXElementConstructor<typeof Input>>[];

const Form = (
    { children, handleSubmit, className }
    : { children: Inputs, handleSubmit: (event: React.FormEvent) => void, className: string}
) => {
    return (
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;