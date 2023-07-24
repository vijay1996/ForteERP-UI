import React, { useEffect, useState } from "react";
import './style.css';

const SelectInput = (
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

    const [value, setValue] = useState<string|number|null>(field.defaultValue);

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
            <select 
                className="form form-control form-select" 
                aria-label="Default select example"
                id={field.name} 
                required={!!field.required}
                value={value as string}
                onChange={(event) => setValue(event.target.value)}
            >
                {
                    field.values.map((value: any) => {
                        return (<option selected={value.value === value} value={value.value}>{value.label}</option>);
                    })
                }
            </select>
        </div>
    )
}

SelectInput.defaultProps = {
    labelClass: 'dark'
}

export default SelectInput;