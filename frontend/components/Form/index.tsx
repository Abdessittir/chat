import React from 'react';

import Input from '../Input';

type Inputs = React.ReactElement<any, React.JSXElementConstructor<typeof Input>>[];

const Form = (
    { children, handleSubmit }
    : { children: Inputs, handleSubmit: (event: React.FormEvent) => void}
) => {
    return (
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;