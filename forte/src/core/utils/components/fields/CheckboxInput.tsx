import React, { useEffect, useState } from "react";
import './style.css';

const CheckboxInbox = (
    {
        field, 
        filterState, 
        setFilterState, 
        labelClass,
        parentClass
    } : 
    {
        field: any, 
        filterState: object|any, 
        setFilterState: Function, 
        labelClass: string,
        parentClass: string
    }
) => {
    
    const [value, setValue] = useState<string>(filterState[`${field.name}`] || field.defaultValue );

    useEffect(() => {
        setValue(filterState[`${field.name}`]);
    }, [filterState]);

    useEffect(() => {
        const newFilterState = filterState;
        newFilterState[`${field.name}`] = value;
        setFilterState(newFilterState);
    }, [value, field.name]);

    return (
        <div className="form-check checkbox">
            <input 
                className="form-check-input" 
                type="checkbox" 
                checked={value === "Y"} 
                id="flexCheckDefault"
                value={value} 
                onChange={() => {
                    setValue(prev => prev === "Y" ? "N" : "Y");
                }}
            />
            <label className={`form-check-label form-label ${labelClass}`} htmlFor="flexCheckDefault">
                {field.label}
            </label>
        </div>
    )
}

CheckboxInbox.defaultProps = {
    labelClass: 'dark'
}

export default CheckboxInbox;