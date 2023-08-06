import React, { useEffect, useState } from "react";
import './style.css';
import fieldEvaluators from '../../../utils/functions/fieldEvaluators';
import { convertToBase64 } from "../../functions/formRenderLogic";
import ImageIcon from '@mui/icons-material/Image'


interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

const ImageBase64Input = ({field, filterState, setFilterState, labelClass, parentClass, setRerender} : {field: any, filterState: object|any, setFilterState: Function, labelClass: string, parentClass: string, setRerender:Function}) => {

    const [value, setValue] = useState<string|number|null>(filterState && filterState[`${field.name}`] ? filterState[`${field.name}`] : field.defaultValue);

    useEffect(() => {
        setValue(filterState[`${field.name}`]);
    }, [filterState]);

    const saveImage = (event: HTMLInputEvent) => {
        const image = (event?.target?.files as FileList)[0];
        convertToBase64(image)
            .then(data => {
                setValue(data as string);
            })
            .catch(error => {
                field.error = error
            })
    }

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
            <label id={`${field.name}-imagebase64-label`} className={`form-label ${labelClass}`} htmlFor={field.name}>{field.label}(.jpeg, .png, .jpg)<span className="error">{field.error}</span></label>
            <br/>
            <input 
                type="file"
                className={`custom-file-input form-label`} 
                id={field.name} 
                required={!!field.required}
                disabled={field.disabled}
                onChange={event => saveImage(event as any)}
                accept=".jpeg, .png, .jpg"
                style={{marginTop: "5px"}}
            />
            <div>
                {value ? <img className={"img-sm-relative"} style={{maxWidth: document.getElementById(`${field.name}-imagebase64-label`)?.offsetWidth}} src={value as string} /> : <div className={"img-sm-relative"}>No image selected.</div>}
            </div>
        </div>
    );
};

ImageBase64Input.defaultProps = {
    labelClass: 'dark'
}

export default ImageBase64Input;