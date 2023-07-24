import React, { ReactElement, Suspense, useEffect, useState } from "react";
import { PageStateInterface } from "../interface/pageStateInterface";
import '../css/sidebar.css'

const Maintenance = React.lazy(() => import('../../meta/Navigate'));

const Sidebar = ({pageState, setPageState} : {pageState: PageStateInterface, setPageState: Function}) => {

    const [nav, setNav] = useState<ReactElement>(<React.Fragment></React.Fragment>);

    useEffect(() => {
        if (pageState.application === "Business") {
            setNav(<React.Fragment></React.Fragment>);
        } else if (pageState.application === "Maintenance") {
            setNav(
                <Suspense fallback={<React.Fragment></React.Fragment>}>
                    <Maintenance pageState={pageState} setPageState={setPageState} />
                </Suspense>
            )
        } else if (pageState.application === "Business") {
            setNav(<React.Fragment></React.Fragment>);
        } else {
            setNav(<React.Fragment></React.Fragment>);
        }
    }, [pageState.application]);

    return (
        <div id="sidebarView" className='col-md-12' style={{height: pageState.sidebarHeight}}>
            {nav}
        </div>
    )
}

export default Sidebar;