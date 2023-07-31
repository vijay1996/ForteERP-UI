import { PageStateInterface } from "../../interface/pageStateInterface";

const errorCodes: any = {
    11000: "already exists!"
}

function getReadableError (errorCode: number) {
    const key: string = errorCode.toString();
    return `Record ${errorCodes[key] || 'could not be processed!'}`;
}

function getReadableServiceError (errors: Array<any>) {
    let returnText: Array<string> = [];
    errors?.forEach(error => {
        switch (error.kind) {
            case 'required':
                returnText.push(`"${error.path}" is required`);
        }
    })
    return returnText.join(', ');
}

export function handleApiError (response: any, successMessage: string, setPageState: Function) {
    if (response?.data?.writeErrors && response?.data?.writeErrors[0]?.err?.errmsg) {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            toastMessageSeverity: 'error',
            toastMessage: getReadableError(response.data.writeErrors[0].err.code)
        }));
    } else if (response?.data?.name === "ValidationError" && response?.data?.message) {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            toastMessageSeverity: 'error',
            toastMessage: getReadableServiceError(Object.keys(response.data.errors).map(error => response.data.errors[error]))
        }));
    } else {
        setPageState((prev: PageStateInterface) => ({
            ...prev,
            toastMessageSeverity: 'success',
            toastMessage: successMessage,
            form: null
        }));
    }
}