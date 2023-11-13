import React from 'react';
import './index.css';

type Options = {
    type: string,
    name: string,
    value: string | number,
    onChange: () => void,
};

const CheckBox = (
    {label, options}
    :{ label: string, options: Options,}
) => {
    return (
        <div className="checkbox_container" onClick={options.onChange}>
            <label onClick={options.onChange}>{label}</label>
            <input {...options} />
        </div>
    );
};
export default CheckBox;
