import CheckboxInbox from "../components/fields/CheckboxInput";
import DynamicSelectInput from "../components/fields/DynamicSelectInput";
import ImageBase64Input from "../components/fields/ImageBase64Input";
import ListInput from "../components/fields/ListInput";
import NumberInput from "../components/fields/NumberInput";
import SelectInput from "../components/fields/SelectInput";
import TextInput from "../components/fields/TextInput";
import TextareaInput from "../components/fields/TextareaInput";

const RenderFields = (field: any, filterState: Object|any, setFilterState: Function, labelClass: string, parentClass: string, setRerender:Function) => {
        switch (field.type) {
            case 'Text':
            case 'Email':
                return (
                    <TextInput 
                        field={field} 
                        filterState={filterState} 
                        setFilterState={setFilterState} 
                        labelClass={labelClass} 
                        parentClass={parentClass}
                        setRerender={setRerender}
                    />
                );
            case 'Number':
            case 'Decimal':
                return (
                    <NumberInput 
                        field={field} 
                        filterState={filterState} 
                        setFilterState={setFilterState} 
                        labelClass={labelClass} 
                        parentClass={parentClass}
                        setRerender={setRerender}
                    />
                );
            case 'Select':
                return (
                    <SelectInput 
                        field={field} 
                        filterState={filterState} 
                        setFilterState={setFilterState} 
                        labelClass={labelClass} 
                        parentClass={parentClass} 
                        setRerender={setRerender}
                    />
                );
            case 'Checkbox':
                return (
                    <CheckboxInbox 
                        field={field} 
                        filterState={filterState} 
                        setFilterState={setFilterState} 
                        labelClass={labelClass} 
                        parentClass={parentClass} 
                    />
                )
            case 'DynamicSelect':
                return (
                    <DynamicSelectInput 
                        field={field} 
                        filterState={filterState} 
                        setFilterState={setFilterState} 
                        labelClass={labelClass} 
                        parentClass={parentClass} 
                        setRerender={setRerender}
                    />
                )
            case 'LongText':
                return (
                    <TextareaInput
                        field={field} 
                        filterState={filterState} 
                        setFilterState={setFilterState} 
                        labelClass={labelClass} 
                        parentClass={parentClass}
                        setRerender={setRerender}
                    />
                )
            case 'ImageBase64':
                return (
                    <ImageBase64Input
                        field={field} 
                        filterState={filterState} 
                        setFilterState={setFilterState} 
                        labelClass={labelClass} 
                        parentClass={parentClass}
                        setRerender={setRerender}
                    />
                )
            case 'List':
                return (
                    <ListInput
                        field={field} 
                        filterState={filterState} 
                        setFilterState={setFilterState} 
                        labelClass={labelClass} 
                        parentClass={parentClass}
                        setRerender={setRerender}
                    />
                )
            case 'Filler':
                return (<div>&nbsp;</div>)
        }
}

export default RenderFields;