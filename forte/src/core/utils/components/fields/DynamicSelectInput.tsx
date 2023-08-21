import React, { useEffect, useState } from "react";
import './style.css';
import { callApiInPostMode } from "../../functions/api";

const DynamicSelectInput = (
    {
        field, 
        filterState, 
        setFilterState, 
        labelClass, 
        parentClass,
        setRerender
    } : 
    {
        field: any, 
        filterState: object|any, 
        setFilterState: Function, 
        labelClass: string, 
        parentClass: string,
        setRerender: Function
    }
) => {

    const [value, setValue] = useState<string|null>(filterState && filterState[`${field.name}`] ? filterState[`${field.name}`] : field.defaultValue);
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
        !value && setValues([]);
        setRerender((prev:number) => prev + 1);
    }, [value, field.name]);

    return (
        <div className={`field-container ${parentClass}`}>
            <label className={`form-label ${labelClass}`} htmlFor={field.name}>{field.label}<span className="error">{field.error}</span></label>
            <input
                value={value as string}
                onChange={(e) => {
                    setValue(e.target.value);
                    e.target.value && callApiInPostMode(field.api.application, field.api.screen, 'dynamicSelect', JSON.parse(`{"${field.api.alias?.value || field.name}": "${value}"}`)).then((response: any) => {
                        setValues(response.data);
                    })
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                className="form form-control"
                placeholder="search"
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
                                onMouseDown={() => setValue(val[`${field.api.alias?.value || field.name}`])}
                            >
                                {val[`${field.api.alias?.value || field.name}`]}
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