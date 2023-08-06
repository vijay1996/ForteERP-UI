import React, { useEffect } from 'react';
import '../css/navbar.css';
import { PageStateInterface } from '../interface/pageStateInterface';
import CancelIcon from '../utils/icons/CancelIcon';

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
            </div>
        </nav>
    )
};

export default Navbar;