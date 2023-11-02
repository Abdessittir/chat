import React from 'react';

import Input from '../Input';

type Inputs = React.ReactElement<any, React.JSXElementConstructor<typeof Input>>[];

const Form = (
    { children, handleSubmit, url }
    : { children: Inputs, handleSubmit: (event: React.FormEvent) => void, url: string }
) => {
    return (
        <form onSubmit={handleSubmit} action={url} method="post" >
            {children}
        </form>
    );
};

export default Form;