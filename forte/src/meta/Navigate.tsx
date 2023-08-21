import { PageStateInterface } from "../core/interface/pageStateInterface";
import maintenance from './maintenance/index';
import './css/navigate.css';


const Navigate = ({pageState, setPageState} : {pageState: PageStateInterface, setPageState: Function}) => {

    const navigateTo = (screen:String) => {
        setPageState((prev:PageStateInterface) => ({
            ...prev,
            //@ts-ignore
            metadata: maintenance[`${screen}`],
            screen: screen,
            showSidebar: false,
            form: null
        }))
    };

    if (pageState.application === "Business") {
        return null;
    } else if (pageState.application === "Maintenance") {
        return (
            <div className="container row">
                <div className="col-md-12 sidebar-link" onClick={() => navigateTo("organisation")}>Organisation</div>
                <div className="col-md-12 sidebar-link" onClick={() => navigateTo("users")}>Users</div>
                <div className="col-md-12 sidebar-link" onClick={() => navigateTo("products")}>Products</div>
                <div className="col-md-12 sidebar-link" onClick={() => navigateTo("attributes")}>Attributes</div>
            </div>
        );        
    } else if (pageState.application === "Reporter") {
        return null
    } else {
        return null
    }

}

export default Navigate;