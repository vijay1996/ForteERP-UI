import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { PageStateInterface } from './interface/pageStateInterface';
import Sidebar from './components/Sidebar';
import Loader from './utils/components/loader/Loader';
import './css/core.css';
import Grid from './components/Grid';
import maintenance from '../meta/maintenance';
import Form from './components/Form';
import { callApiInPostMode } from './utils/functions/api';
import ForteToast from './utils/components/toast/Toast';
import { AlertColor } from '@mui/material';


const Core = () => {

    const applications: any = ['Business', 'Maintenance', 'Analytics'];
    const defaultScreens: any = ["", "organisation", ""]
    //@ts-ignore
    const defaultMetadatas: any = [null, maintenance[`${defaultScreens[1]}`], null];

    const handleToastCancel = () => {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            toastMessage: null,
            toastMessageSeverity: null
        }))
    }

    const [pageState, setPageState] = useState<PageStateInterface>({
        activeTab: 1,
        showSidebar: false,
        sidebarHeight: 0,
        application: null,
        screen: null,
        metadata: null,
        loader: false,
        form: null,
        toastMessage: null,
        toastMessageSeverity: null
    });

    useEffect(() => {

        setPageState((prev: PageStateInterface) => ({
            ...prev,
            application: applications[pageState.activeTab as number],
            screen: defaultScreens[pageState.activeTab as number],
            metadata: defaultMetadatas[pageState.activeTab as number],
            form: null
        }))
    }, [pageState.activeTab]);

    return (
        <div className='jumbotron' id="app-view">
            <Navbar 
                pageState={pageState} 
                setPageState={setPageState}
                applications={applications}
            />
            { pageState.showSidebar && <Sidebar pageState={pageState} setPageState={setPageState} /> }
            {
                pageState?.form ? 
                    (<Form pageState={pageState} setPageState={setPageState} />) :
                    (<Grid pageState={pageState} setPageState={setPageState} />)
            }
            {pageState.loader && <Loader pageState={pageState} />}
            <ForteToast 
                toastMessage={pageState.toastMessage as string } 
                show={!!pageState.toastMessage} 
                severity={pageState.toastMessageSeverity as AlertColor} 
                handleCancel={() => handleToastCancel()}
            />
        </div>
    )
}

export default Core;