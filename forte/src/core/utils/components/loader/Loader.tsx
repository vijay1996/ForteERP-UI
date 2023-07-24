import React from "react";
import { PageStateInterface } from "../../../interface/pageStateInterface";
import './loader.css'

const Loader = ({pageState}: {pageState: PageStateInterface}) => {
    return (
        <div id="canvas">
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader;