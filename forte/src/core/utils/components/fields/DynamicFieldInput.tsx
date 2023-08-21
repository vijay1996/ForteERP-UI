import React, { useEffect, useState } from "react";
import './style.css';
import { callApiInPostMode } from "../../functions/api";
import TextInput from "./TextInput";

const DynamicFieldInput = (
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

    const [value, setValue] = useState<any>(filterState[`${field.name}`] || {});
    const [fields, setFields] = useState<Array<any>>([]);

    useEffect(() => {
        const newFilterState = filterState;
        newFilterState[`${field.name}`] = value;
        setRerender((prev: number) => prev + 1)
    }, [JSON.stringify(value)])

    useEffect(() => {
        const payload: any = {};
        payload[`${field.apiConfig.filter.fieldName}`] = filterState[`${field.apiConfig.filter.fieldValue}`];
        if (filterState[`${field.apiConfig.filter.fieldValue}`]) {
            callApiInPostMode(field.apiConfig.application, field.apiConfig.screen, 'list', payload)
            .then((data) => {
                if (data?.data[0][`${field.apiConfig.filter.fieldValue}`] !== filterState[`${field.apiConfig.filter.fieldValue}`]) return;
                const renderData = data?.data[0][`${field.name}`]
                const fieldsToRender:Array<any> = [];
                for (let i = 0; i < Object.keys(renderData).length/2; i++) {
                    if (!Object.hasOwn(value, renderData[`${i}_0`])) {
                        value[`${renderData[`${i}_0`]}`] = null;
                    }
                    switch (renderData[`${i}_1`]) {
                        case 'Text':
                            const textField = 
                                <div className="col-3">
                                    <label className={`form-label ${labelClass}`} htmlFor={renderData[`${i}_0`]}>{renderData[`${i}_0`]}</label>
                                    <input 
                                        type="text" 
                                        className={`form form-control`} 
                                        name={renderData[`${i}_0`]}
                                        value={value[`${renderData[`${i}_0`]}`]}
                                        onChange={(e) => setValue((prev:any) => {
                                            prev[`${renderData[`${i}_0`]}`] = e.target.value;
                                            return prev;
                                        })}
                                    />
                                </div>
                            fieldsToRender.push(textField);
                            break;
                        case 'Number':
                            const numberField = 
                                <div className="col-3">
                                    <label className={`form-label ${labelClass}`} htmlFor={renderData[`${i}_0`]}>{renderData[`${i}_0`]}</label>
                                    <input 
                                        type="number" 
                                        className={`form form-control`} 
                                        value={value[`${renderData[`${i}_0`]}`]}
                                        onChange={(e) => setValue((prev:any) => {
                                            prev[`${renderData[`${i}_0`]}`] = e.target.value;
                                            return prev;
                                        })}
                                    />
                                </div>
                            fieldsToRender.push(numberField);
                            break;
                    }
                }
                setFields(fieldsToRender);
            });
        }
    }, [filterState[`${field.apiConfig.filter.fieldValue}`]])

    return (
        <div className={`field-container ${parentClass} row`}>
            {fields}
        </div>
    )
}

DynamicFieldInput.defaultProps = {
    labelClass: 'dark'
}

export default DynamicFieldInput;