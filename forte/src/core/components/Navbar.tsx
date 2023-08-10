import React, { useEffect } from 'react';
import '../css/navbar.css';
import { PageStateInterface } from '../interface/pageStateInterface';
import CancelIcon from '../utils/icons/CancelIcon';
import { removeItem } from '../utils/functions/localStorage';

const Navbar = (
    {
        pageState, 
        setPageState,
        applications
    } : 
    {
        pageState: PageStateInterface, 
        setPageState: Function,
        applications: Array<string>
    }
) => {

    useEffect(() => {
        const sidebarHeight = window.innerHeight - (document?.getElementById("navbarView")?.offsetHeight ?? 0)
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            sidebarHeight: sidebarHeight
        }));
    }, [setPageState])

    const isActiveTab = (index: number) => index === pageState.activeTab ? 'active' : '';

    const performClick = (index: number) => {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            activeTab: index
        }));
    };

    const toggleSidebar = () => {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            showSidebar: !prev.showSidebar
        }));
    };

    return (
        <nav id="navbarView" className="navbar sticky-top bg-dark navbar-expand-lg border-bottom border-bottom-dark" data-bs-theme="dark">
            <div className="container-fluid">
                {
                    pageState.showSidebar ?
                    <CancelIcon className="bi bi-x-square icon clickable" onClick={() => toggleSidebar()} /> :
                    <span className="navbar-toggler-icon clickable icon" onClick={() => toggleSidebar()}></span>
                }
                
                <span className={`navbar-brand brand-name clickable`}>ForteERP</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {applications.map((application: string, index: number) => <button className={`nav-link clickable ${isActiveTab(index)}`} onClick={() => performClick(index)}>{application}</button>)}
                    </div>
                </div>
                <form className="form-inline my-2 my-lg-0">
                    <button 
                        className="btn btn-outline-success my-2 my-sm-0" 
                        type="button" 
                        onClick={() => {
                            removeItem('token');
                            window.location.reload()
                        }}
                    >
                        Logout
                    </button>
                    &nbsp;
                    <button 
                        className="btn btn-outline-danger my-2 my-sm-0" 
                        type="button" 
                        onClick={() => {
                            localStorage.removeItem(process.env.REACT_APP_CACHE_LOCATION as string);
                            window.location.reload();
                        }}
                    >
                        Clear cache
                    </button>
                </form>
            </div>
        </nav>
    )
};

export default Navbar;