import React, { ReactElement, Suspense, useEffect, useState } from "react";
import { PageStateInterface } from "../interface/pageStateInterface";
import '../css/sidebar.css'

const Navigate = React.lazy(() => import('../../meta/Navigate'));

const Sidebar = ({pageState, setPageState} : {pageState: PageStateInterface, setPageState: Function}) => {

    return (
        <div id="sidebarView" className='col-md-3' style={{height: pageState.sidebarHeight}}>
            <Suspense fallback={<React.Fragment></React.Fragment>}>
                <Navigate pageState={pageState} setPageState={setPageState} />
            </Suspense>
        </div>
    )
}

export default Sidebar;