import React, { useEffect, useState } from "react";
import './ListInput.css'
import fieldEvaluators from '../../../utils/functions/fieldEvaluators';
import { getAllFieldsForIndices, getAllIndices, getFieldsByParent } from "../../functions/formRenderLogic";
import RenderFields from "../../functions/RenderFields";
import PlusIcon from "../../icons/PlusIcon";

const ListInput = ({field, filterState, setFilterState, labelClass, parentClass, setRerender} : {field: any, filterState: object|any, setFilterState: Function, labelClass: string, parentClass: string, setRerender:Function}) => {

    const [modalFields, setModalFields] = useState<any>([]);
    const [listFilterstate, setListFilterstate] = useState<any>(filterState && filterState[`${field.name}`] ? filterState[`${field.name}`] : {});

    useEffect(() => {
        setModalFields([]);
        if (Object.keys(listFilterstate).length) {
            const totalFields = Object.keys(listFilterstate).length / field.resolvedMetadata?.fields?.filter((childField: any) => childField.type !== 'Sheet').length;
            for (let i = 0; i < totalFields; i++) {
                addAttributeRow(i, setModalFields, 'render');
            }
        }
    }, []);

    useEffect(() => {
        const newFilterState = JSON.parse(JSON.stringify(filterState));
        newFilterState[`${field.name}`] = listFilterstate
        setFilterState(newFilterState);
    }, [JSON.stringify(listFilterstate)])

   const addAttributeRow = (attributeIndex:number|null, fieldSetterCallback: Function, action:string) => {
        const fields = JSON.parse(JSON.stringify(field.resolvedMetadata?.fields?.filter((field: any) => field.type !== 'Sheet')));
        const indices = getAllIndices(fields);
        const totalSpans = Array.from(indices).map(index => {
            const fieldsForIndex = getAllFieldsForIndices(fields, index as number);
            const totalSpan: Array<number> = fieldsForIndex.length > 1 ? 
                fieldsForIndex.reduce((total: any, field: any) => {
                    let currentTotal = total.span || total
                    return currentTotal + field.span
                }) :
                fieldsForIndex[0].span;
            return totalSpan;
        });
        //@ts-ignore
        let totalSpan: number = totalSpans.sort((a:Array<number>, b: Array<number>) => b - a)[0];
        totalSpan = totalSpan < 12 ? 12 : totalSpan;
        const newRenders = Array.from(indices).map(index => {
            const fieldsForIndex = getAllFieldsForIndices(fields, index as number);
            const currentTotalSpan: Array<number> = fieldsForIndex.length > 1 ? 
                fieldsForIndex.reduce((total: any, field: any) => {
                    return (total.span || total) + field.span
                }) :
                fieldsForIndex[0].span;
            let fractions = fieldsForIndex.map((field: any) => `${(12 * field.span) / totalSpan}fr`).join(" ");
            //@ts-ignore
            fractions += currentTotalSpan !== totalSpan ? ` ${12 * (totalSpan - currentTotalSpan) / totalSpan}fr` : ''
            return (
                <div style={{display: 'grid', gridTemplateColumns: fractions, gridTemplateRows: "auto", columnGap: "5px"}}>
                    {fieldsForIndex.map((childField: any, childIndex:number) => {
                        childField.name = `${attributeIndex}_${childIndex}`;
                        childField.value = listFilterstate[`${childField.name}`];
                        return RenderFields(childField, listFilterstate, setListFilterstate, "grid-item", "light", setRerender)
                    })}
                </div>
            )
        })
        fieldSetterCallback((prev: any) => 
            [
                ...prev, 
                newRenders
            ]
        )
    };

    return (
        <div className="container-fluid" style={{overflow: "auto"}}>
            <div className="col-12">
                <div className="grid-item" style={{height: "50px", width: "25px"}}>
                    <PlusIcon className="clickable" onClick={() => addAttributeRow(modalFields.length, setModalFields, 'add')} />
                </div>
                {modalFields?.map((field: any) => (
                    <div className="grid-item">
                        {field}
                    </div>
                ))}
            </div>
        </div>
    );
};

ListInput.defaultProps = {
    labelClass: 'dark'
}

export default ListInput;
