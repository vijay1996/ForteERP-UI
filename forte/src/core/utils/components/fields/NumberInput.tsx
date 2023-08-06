import React, { useEffect, useState } from "react";
import './style.css';
import fieldEvaluators from '../../../utils/functions/fieldEvaluators';

const NumberInput = ({field, filterState, setFilterState, labelClass, parentClass, setRerender} : {field: any, filterState: object|any, setFilterState: Function, labelClass: string, parentClass: string, setRerender:Function}) => {

    const [value, setValue] = useState<string|number|null>(filterState && filterState[`${field.name}`] ? filterState[`${field.name}`] : field.defaultValue);

    useEffect(() => {
        setValue(filterState[`${field.name}`]);
    }, [filterState]);

    useEffect(() => {
        field.value = value;
        //@ts-ignore
        field.validators?.length && field.validators.forEach((func:string) => fieldEvaluators[`${func}`](field, []))
        const newFilterState = filterState;
        newFilterState[`${field.name}`] = value;
        setFilterState(newFilterState);
        setRerender((prev: number) => prev + 1)
    }, [value, field.name, field.changed]);

    return (
        <div className={`field-container ${parentClass}`}>
            <label className={`form-label ${labelClass}`} htmlFor={field.name}>{field.label}<span className="error">{field.error}</span></label>
            <input 
                className={`form form-control`} 
                type={'number'}
                id={field.name}
                step={field.type === 'Number' ? 1 : (field.props?.step || 0.01)}
                maxLength={field.props?.maxLength} 
                required={!!field.required}
                disabled={field.disabled}
                value={value as string}
                onChange={(event) => setValue(event.target.value)}
            />
        </div>
    );
};

NumberInput.defaultProps = {
    labelClass: 'dark'
}

export default NumberInput;