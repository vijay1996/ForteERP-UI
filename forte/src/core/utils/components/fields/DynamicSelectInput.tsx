import React, { useEffect, useState } from "react";
import './style.css';
import { callApiInPostMode } from "../../functions/api";
import { Select } from "@mui/material";

const DynamicSelectInput = (
    {
        field, 
        filterState, 
        setFilterState, 
        labelClass, 
        parentClass,
    } : 
    {
        field: any, 
        filterState: object|any, 
        setFilterState: Function, 
        labelClass: string, 
        parentClass: string
    }
) => {

    const [value, setValue] = useState<string|null>(filterState[`${field.name}`] || field.defaultValue);
    const [values, setValues] = useState<Array<any>>([{label: "test", value: "test"}])
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        setValue(filterState[`${field.name}`]);
    }, [filterState]);

    useEffect(() => {
        const newFilterState = {...filterState};
        newFilterState[`${field.name}`] = value;
        setFilterState(newFilterState);
        value?.split('').map((character:string) => character === '/' ? '//' : character).join('')
        value && callApiInPostMode(field.api.application, field.api.screen, 'dynamicSelect', JSON.parse(`{"${field.name}": "${value}"}`)).then((response: any) => {
            setValues(response.data);
        })
        !value && setValues([]);
    }, [value, field.name]);

    return (
        <div className={`field-container ${parentClass}`}>
            <input
                value={value as string}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                className="form form-control"
                placeholder="type for suggestions"
                type="search"
                id={`dynamic-select-${field.name}`}
            />
            <div 
                className="suggestions form form-control" 
                style={{
                    display: showSuggestions && value?.length ? 'block':'none', 
                    position: "fixed", 
                    width: document.getElementById(`dynamic-select-${field.name}`)?.offsetWidth,
                    border: "2px solid #ccc",
                    minHeight: "150px",
                    maxHeight: "150px",
                    overflowY: "auto"
                }}
            >
                {
                    values.length ? 
                        values.map((val:any) => 
                            <div 
                                className="form-control"
                                style={{
                                    cursor: "pointer",
                                    borderTop: "none",
                                    borderRight:"none",
                                    borderLeft: "none",
                                    borderRadius: "0",
                                    borderBottom: "1px solid #eee",
                                    padding: "5px"
                                }} 
                                onMouseDown={() => setValue(val[`${field.name}`])}
                            >
                                {val[`${field.name}`]}
                            </div>
                        ) : 
                        <></>
                }
            </div>
        </div>
    )
}

DynamicSelectInput.defaultProps = {
    labelClass: 'dark'
}

export default DynamicSelectInput;