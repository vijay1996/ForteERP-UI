import React, { useEffect, useState } from "react";
import { PageStateInterface } from "../interface/pageStateInterface";
import '../css/grid.css';
import PlusIcon from "../utils/icons/PlusIcon";
import DeleteIcon from "../utils/icons/DeleteIcon";
import Filter from "./Filter";

const Grid = ({pageState, setPageState} : {pageState: PageStateInterface, setPageState: Function}) => {

    const [totalSpan, setTotalSpan] = useState<number>(0);
    const [fractionsArray, setFractionsArray] = useState<Array<string>>([]);

    const openAddForm = () => {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            form: "add"
        }))
    }

    useEffect(() => {
        setTotalSpan(
            pageState.metadata?.grid.columns.length > 1 ?
                pageState.metadata?.grid.columns.reduce((total: any, column: any) => {
                    let currentTotal = total.span || total
                    return currentTotal + column.span;
                }) :
                1
        );
    }, [pageState.screen]);

    useEffect(() => {
        setFractionsArray(pageState.metadata?.grid.columns.sort((a:any, b:any) => a.index - b.index).map((field: any) => `${12 * field.span / totalSpan}fr`));
    }, [totalSpan]);

    return (
        <div id="content-view" className='row' style={{padding: "0", top: `${window.innerHeight - (pageState.sidebarHeight ?? (window.innerHeight - 50))}`}}>
            <div className='col-md-3' style={{height: pageState.sidebarHeight}}>
                <Filter pageState={pageState} setPageState={setPageState} />
            </div>
            <div className='col-md-9' style={{margin: "0", padding:"0"}}>
                <div id="grid-view" style={{height: pageState.sidebarHeight, width: "100%", overflow: "auto"}}>
                    <div id="grid-toolbar">
                        <div className="display-6">{pageState.screen?.toUpperCase()}</div>
                        <div id="grid-toolbar" style={{marginLeft: "auto"}}>
                            <button className="btn btn-primary grid-toolbar-button" onClick={() => {openAddForm()}}><PlusIcon className="bi-plus-circle-fill grid-toolbar-button-icon" onClick={() => {}} /></button>
                            <button className="btn btn-danger grid-toolbar-button"><DeleteIcon className="bi bi-trash3-fill grid-toolbar-button-icon" onClick={() => {}} /></button>
                        </div>
                    </div>
                    <div style={{padding: "2%", height: pageState.sidebarHeight as number - (document.getElementById("grid-toolbar")?.offsetHeight ?? 0), overflow: "auto"}}>
                        <div style={{display: "grid", gridTemplateColumns: fractionsArray?.join(" ")}}>
                            {pageState.metadata?.grid.columns.map((column: any) => <div>{column.label}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Grid;