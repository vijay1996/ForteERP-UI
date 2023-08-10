import React, { ReactElement, Suspense, useEffect, useState } from "react";
import { PageStateInterface } from "../interface/pageStateInterface";
import '../css/sidebar.css'
import Navigate from "../../meta/Navigate";

const Sidebar = ({pageState, setPageState} : {pageState: PageStateInterface, setPageState: Function}) => {

    return (
        <div id="sidebarView" className='col-md-3' style={{height: pageState.sidebarHeight}}>
            <Navigate pageState={pageState} setPageState={setPageState} />
        </div>
    )
}

export default Sidebar;