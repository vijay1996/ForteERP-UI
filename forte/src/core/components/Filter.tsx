import React, { useEffect, useState, MouseEvent } from "react";
import { PageStateInterface } from "../interface/pageStateInterface";
import RenderFields from "../utils/functions/RenderFields";
import "../css/filter.css";
import { removeNullValuesFromPayload } from "../utils/functions/api";

const Filter = (
    {
        pageState, 
        setFilterState,
        refreshList
    } : 
    {
        pageState: PageStateInterface,
        setFilterState: Function,
        refreshList: Function
    }
) => {

    const [payloadFilter, setPayloadFilter] = useState({});

    const clearFilters = () => {
        setFilterState({});
        refreshList();
    }

    const submit = (event: MouseEvent<HTMLButtonElement>) => {
        removeNullValuesFromPayload(payloadFilter)
        setFilterState(payloadFilter);
        refreshList();
    }

    return (
        <form id="filter-container" className="col-md-3">
            {pageState?.metadata?.filter?.fields?.map((field : Object|any) => {
                return RenderFields(field, payloadFilter, setPayloadFilter, "dark", "", () => {});
            })}
            <div id="buttons-section" className="row">
                <button type="button" className="btn btn-success filter-forte-button col-6" onClick={submit}>Search</button>
                <button type="reset" className="btn btn-secondary filter-forte-button col-6" onClick={() => clearFilters()}>Clear</button>
            </div>
        </form>
    )
}

export default Filter;