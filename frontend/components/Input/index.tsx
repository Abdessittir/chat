import React from 'react';
import './index.css';

type Options = {
    type: string,
    name: string,
    placeholder: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    disabled?: boolean
};

const Input = ({ label, options }:{ label: string, options: Options }) => {
    return (
        <div className="input_container">
            <label>{label}</label>
            <input {...options} />
        </div>
    );
};

export default Input;
