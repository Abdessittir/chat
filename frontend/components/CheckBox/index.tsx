import React from 'react';
import './index.css';

type Options = {
    type: string,
    name: string,
    value: string | number,
    onChange: () => void,
    checked?: boolean
};

const CheckBox = (
    {label, options}
    :{ label: string, options: Options,}
) => {
    return (
        <div className="checkbox_container">
            <label onClick={options.onChange}>{label}</label>
            <input {...options} />
        </div>
    );
};
export default CheckBox;
