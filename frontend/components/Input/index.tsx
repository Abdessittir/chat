import React from 'react';

type Options = {
    type: string,
    name: string,
    placeholder: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const Input = ({ label, options }:{ label: string, options: Options }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...options} />
        </div>
    );
};

export default Input;
