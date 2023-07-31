import React, { useEffect, useState } from "react";
import './style.css';

const TextInput = ({field, filterState, setFilterState, labelClass, parentClass} : {field: any, filterState: object|any, setFilterState: Function, labelClass: string, parentClass: string}) => {

    const [value, setValue] = useState<string|number|null>(filterState[`${field.name}`] || field.defaultValue);

    useEffect(() => {
        setValue(filterState[`${field.name}`]);
    }, [filterState]);

    useEffect(() => {
        const newFilterState = filterState;
        newFilterState[`${field.name}`] = value;
        setFilterState(newFilterState);
    }, [value, field.name]);

    return (
        <div className={`field-container ${parentClass}`}>
            <label className={`form-label ${labelClass}`} htmlFor={field.name}>{field.label}</label>
            <input 
                className={`form form-control`} 
                type={field.type}
                id={field.name} 
                maxLength={field.props?.maxLength} 
                required={!!field.required}
                disabled={field.disabled}
                value={value as string}
                onChange={(event) => setValue(event.target.value)}
            />
        </div>
    );
};

TextInput.defaultProps = {
    labelClass: 'dark'
}

export default TextInput;