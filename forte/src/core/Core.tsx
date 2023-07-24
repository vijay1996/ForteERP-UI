import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { PageStateInterface } from './interface/pageStateInterface';
import Sidebar from './components/Sidebar';
import Loader from './utils/components/loader/Loader';
import './css/core.css';
import Grid from './components/Grid';
import maintenance from '../meta/maintenance';
import Form from './components/Form';


const Core = () => {

    const applications = ['Business', 'Maintenance', 'Reporter'];
    const defaultScreens = ["", "users", ""]
    const defaultMetadatas = [null, maintenance['users'], null];

    const [pageState, setPageState] = useState<PageStateInterface>({
        activeTab: 1,
        showSidebar: false,
        sidebarHeight: 0,
        application: applications[1],
        screen: defaultScreens[1],
        metadata: defaultMetadatas[1],
        loader: false,
        form: null
    });

    useEffect(() => {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            application: applications[pageState.activeTab as number],
            screen: defaultScreens[pageState.activeTab as number],
            metadata: defaultMetadatas[pageState.activeTab as number]
        }))
    }, [pageState.activeTab]);

    return (
        <div className='jumbotron' id="app-view">
            <Navbar 
                pageState={pageState} 
                setPageState={setPageState}
            />
            {pageState.showSidebar ? 
                (
                    <Sidebar pageState={pageState} setPageState={setPageState} />
                ) :
                (
                    pageState.form ? 
                        (<Form pageState={pageState} setPageState={setPageState} />) :
                        (<Grid pageState={pageState} setPageState={setPageState} />)
                )
            }
            {pageState.loader && <Loader pageState={pageState} />}
        </div>
    )
}

export default Core;