import React from "react";
import { PageStateInterface } from "../../../interface/pageStateInterface";
import { Alert, AlertColor, AlertTitle, Snackbar, duration } from "@mui/material";

const ForteToast = ({show, toastMessage, handleCancel, severity}:{show:boolean, toastMessage: string, handleCancel: Function, severity: AlertColor}) => {
    return (
        <Snackbar 
            open={show}
            autoHideDuration={10000}
            onClose={() => handleCancel()}
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            message={toastMessage}
        >
            <Alert
                onClose={() => handleCancel()}
                severity={severity || "info"}
            >
                <AlertTitle>Forte</AlertTitle>
                {toastMessage}
            </Alert>
        </Snackbar>
    )
}

export default ForteToast;