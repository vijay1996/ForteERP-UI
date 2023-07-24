import React, { useEffect, useState } from "react";
import { PageStateInterface } from "../interface/pageStateInterface";
import RenderFields from "../utils/functions/RenderFields";
import "../css/filter.css";

const Filter = ({pageState, setPageState} : {pageState: PageStateInterface, setPageState: Function}) => {

    const [filterState, setFilterState] = useState<any>({});

    const clearFilters = () => {
        setFilterState({});
    }

    const submit = () => {
        console.log(filterState);
    }

    return (
        <form id="filter-container" className="col-md-3">
            {pageState?.metadata?.filter?.fields?.map((field : Object|any) => {
                return RenderFields(field, filterState, setFilterState, "dark", "");
            })}
            <div id="buttons-section" className="row">
                <button type="button" className="btn btn-success forte-button col-6" onClick={() => submit()}>Search</button>
                <button type="reset" className="btn btn-secondary forte-button col-6" onClick={() => clearFilters()}>Clear</button>
            </div>
        </form>
    )
}

export default Filter;