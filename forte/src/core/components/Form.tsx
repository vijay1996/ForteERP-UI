import React, { useEffect, useState } from "react";
import { PageStateInterface } from "../interface/pageStateInterface";
import { getAllFieldsForIndices, getAllIndices, getFieldsByParent, getTabCount, getTabs } from "../utils/functions/formRenderLogic";
import '../css/form.css';
import RenderFields from "../utils/functions/RenderFields";
import { callApiInPostMode } from "../utils/functions/api";
import { handleApiError } from "../utils/functions/errorHandling";

const Form = ({pageState, setPageState} : {pageState: PageStateInterface, setPageState: Function}) => {

    const [formState, setFormState] = useState<any>({
        tabs: 0,
        currentTab: null,
        currentParent: null,
        toast: null
    });
    const [filterState, setFilterState] = useState<any>(Object.keys(pageState.editRecord).length ? pageState.editRecord : {});
    const [fields, setFields] = useState<any>(null);
    const [rerender, setRerender] = useState(0);

    const setLoader = (state: boolean) => {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            loader: state
        }))
    }

    const cancelForm = () => {
        setPageState((page: PageStateInterface) => ({
            ...page,
            form: null
        }));
    };

    const getActiveTab = (field: any, index: number) => {
        if (formState.currentTab) {
            return formState.currentTab === field.label ? "active" : "";
        } else {
            return index === 0 ? "active" : "";
        }
    }

    const setActiveTab = (field: any) => {
        setFormState((prev: any) => ({
            ...prev,
            currentTab: field.label,
            currentParent: field.name
        }));
    }

    const submitForm = async () => {
        setLoader(true);
        pageState?.form === 'add' && (delete filterState._id);
        handleApiError(await callApiInPostMode(pageState.application as string, pageState.screen as string, pageState.form as string, filterState).finally(() => setLoader(false)), `Record ${pageState.form === 'add' ? 'added' : 'updated'} successfully!`, setPageState, () => setRerender(prev => prev+1));
    }


    useEffect(() => {
        const fieldsForParent = getFieldsByParent(formState.currentParent, pageState.metadata?.form?.fields);
        const indices = getAllIndices(fieldsForParent);
        const totalSpans = Array.from(indices).map(index => {
            const fieldsForIndex = getAllFieldsForIndices(fieldsForParent, index as number);
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
        pageState.metadata?.form?.fields?.forEach((field: any) => {
            if (field.type === 'List') {
                field.resolvedMetadata = JSON.parse(JSON.stringify(pageState.metadata[`${field.metadata}`]));
            }
        })
        setFields(Array.from(indices).map(index => {
            const fieldsForIndex = getAllFieldsForIndices(fieldsForParent, index as number);
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
                    {fieldsForIndex.map((field: any) => RenderFields(field, filterState, setFilterState, "grid-item", "light", setRerender))}
                </div>
            )
        }))

    }, [formState.currentParent, pageState.metadata?.form?.fields, rerender]);

    return (
        <div id="form-view" style={{height: pageState.sidebarHeight}}>
            {getTabCount(pageState.metadata?.form.fields) > 1 && 
                (<div className="tab-bar">
                    <ul className="nav nav-tabs">
                        {getTabs(pageState.metadata?.form?.fields).map((field: any, index: number) => (
                            <li className="nav-item clickable" onClick={() => setActiveTab(field)}>
                                <span className={`nav-link ${getActiveTab(field, index)}`}>{field.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>)
            }
            <div className="fields-section">
                {fields?.map((field: any) => (
                    <div className="grid-item">
                        {field}
                    </div>
                ))}
            </div>
            <div className="button-container">
                <button className="btn btn-primary action-button" onClick={() => submitForm()}>Save</button>
                <button className="btn btn-danger action-button" onClick={() => cancelForm()}>Cancel</button>
            </div>
        </div>
    );
}

export default Form;