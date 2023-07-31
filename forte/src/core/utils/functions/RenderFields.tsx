import CheckboxInbox from "../components/fields/CheckboxInput";
import DynamicSelectInput from "../components/fields/DynamicSelectInput";
import SelectInput from "../components/fields/SelectInput";
import TextInput from "../components/fields/TextInput";

const RenderFields = (field: any, filterState: Object|any, setFilterState: Function, labelClass: string, parentClass: string) => {
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
                    />
                )
            
        }
}

export default RenderFields;