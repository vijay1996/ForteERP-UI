import React, { useEffect, useState } from "react";
import { PageStateInterface } from "../interface/pageStateInterface";
import '../css/grid.css';
import PlusIcon from "../utils/icons/PlusIcon";
import DeleteIcon from "../utils/icons/DeleteIcon";
import Filter from "./Filter";
import { callApiInPostMode, removeNullValuesFromPayload } from "../utils/functions/api";
import { Checkbox, Menu } from "@mui/material";
import { LoopOutlined, MoreVert } from "@mui/icons-material";
import { handleApiError } from "../utils/functions/errorHandling";
import Sidebar from "./Sidebar";

const Grid = ({pageState, setPageState} : {pageState: PageStateInterface, setPageState: Function}) => {

    const [triggerList, setTriggerList] = useState(0);
    const [filterState, setFilterState] = useState({});
    const [gridData, setGridData] = useState<Array<any>>([]);
    const [searchString, setSearchString] = useState("");
    const [recordsToBeDeleted, setRecordsToBeDeleted] = useState<Array<string>>([]);

    const setLoader = (state: boolean) => {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            loader: state
        }))
    }

    const openAddForm = (record:any) => {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            form: "add",
            editRecord: record
        }));
    }

    const openEditForm = (record: any) => {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            form: "update",
            editRecord: record
        }));
    }

    const onCheckboxChange = (checked:boolean, id:string) => {
        if (checked) {
            setRecordsToBeDeleted((prev: Array<string>) => Array.from(new Set([...prev, id])));
        } else {
            setRecordsToBeDeleted((prev: Array<string>) => prev.filter((idx:string) => idx !== id))
        }
    }

    const deleteRecords = async (records: any) => {
        setLoader(true);
        const recordsToBeDeleted = Array.isArray(records) ? [...records] : [records];
        handleApiError(
            await callApiInPostMode(pageState.application as string, pageState.screen as string, `delete`, recordsToBeDeleted)
                .finally(() => {
                    setTriggerList(prev => prev + 1);
                    setLoader(false);
                }),
            "Record(s) deleted successfully", 
            setPageState,
            ()=>{});
    }

    useEffect(() => {
        let newGridData: Array<any> = [];
        setGridData([]);
        pageState.application && pageState.screen &&
            callApiInPostMode(pageState.application as string, pageState.screen as string, `list/${searchString}`, removeNullValuesFromPayload(filterState))
                .then((response) => {
                    response?.data?.forEach((entry:any) => {
                        const row = [];
                        row.push(<Checkbox onChange={(e) => onCheckboxChange(e.target.checked, entry._id)} />);
                        row.push(
                            <div className="dropdown">
                                <a  type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <MoreVert />
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <button className="dropdown-item" type="button" onClick={() => openAddForm(entry)}>Copy</button>
                                    <button className="dropdown-item" type="button" onClick={() => openEditForm(entry)}>Edit</button>
                                    <button className="dropdown-item" type="button" onClick={() => deleteRecords(entry._id)}>Delete</button>
                                </div>
                            </div>
                        );
                        pageState.metadata?.grid.columns.sort((a:any,b:any) => a.index - b.index)
                            ?.forEach((column:any) => row.push(entry[`${column.name}`]));
                        newGridData = [...newGridData, row]
                        setGridData(newGridData);
                    })
                })
                .catch((error) => console.log(error));
    }, [pageState.application, pageState.screen, triggerList, searchString])

    return (
        <div id="content-view" className='row' style={{padding: "0", top: `${window.innerHeight - (pageState.sidebarHeight ?? (window.innerHeight - 50))}`}}>
            <div className='col-md-3' style={{height: pageState.sidebarHeight}}>
                {
                    <Filter 
                        pageState={pageState}
                        setFilterState={setFilterState} 
                        refreshList={() => setTriggerList(prev => prev + 1)} 
                    />
                }
            </div>
            <div className='col-md-9' style={{margin: "0", padding:"0"}}>
                <div id="grid-view" style={{height: pageState.sidebarHeight, width: "100%"}}>
                    <div id="grid-toolbar">
                        <div className="display-6">{pageState.screen?.toUpperCase()}</div>
                        <div id="grid-toolbar" style={{marginLeft: "auto"}}>
                            <input className="form-control" type="search" placeholder="search" value={searchString} onChange={(e) => setSearchString(e.target.value)}  />
                            <button className="btn btn-primary grid-toolbar-button" onClick={() => {openAddForm({})}}><PlusIcon className="bi-plus-circle-fill grid-toolbar-button-icon" onClick={() => {}} /></button>
                            <button className="btn btn-danger grid-toolbar-button" onClick={() => deleteRecords(recordsToBeDeleted)}><DeleteIcon className="bi bi-trash3-fill grid-toolbar-button-icon" onClick={() => {}} /></button>
                        </div>
                    </div>
                    {
                        gridData?.length ?
                            (<div style={{padding: "2%", height: pageState.sidebarHeight as number - (document.getElementById("grid-toolbar")?.offsetHeight ?? 0)}}>
                                <table className="table table-striped">
                                    <thead className="table-dark">
                                        <tr>
                                            <th style={{width: "40px"}}></th>
                                            <th style={{width: "40px"}}></th>
                                            {pageState.metadata?.grid.columns.sort((a:any,b:any) => a.index - b.index)
                                                .map((column: any) => <th scope="col">{column.label}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gridData.map((data: any) => (
                                            <tr style={{verticalAlign: "middle"}}>
                                                {data.map((columnValue:any, index: number) => (
                                                    <td style={index < 2 ? {width: "40px" } : {}}>{columnValue}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>) :
                            (
                                <div style={{height: "80%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                    <LoopOutlined style={{height: "150px", width: "150px"}} />
                                    <h3>No results found.</h3>
                                </div>
                            )
                        }
                </div>
            </div>
        </div>
    )
}

export default Grid;