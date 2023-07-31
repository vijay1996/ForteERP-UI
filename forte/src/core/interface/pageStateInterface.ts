import { AlertColor } from "@mui/material";

export interface PageStateInterface {
    activeTab?: number,
    showSidebar?: boolean,
    sidebarHeight?: number,
    application?: string|null,
    screen?: string|null,
    metadata?: any,
    loader?: boolean,
    form?: string|null,
    toastMessage?: string|null,
    toastMessageSeverity?: AlertColor|null,
    editRecord?: any
}