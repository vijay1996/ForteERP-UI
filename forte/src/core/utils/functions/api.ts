import axios from "axios";
import { getItem } from "./localStorage";

export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function callApiInPostMode (application: string, screen: string, call: string, payload: any) {
    if (!application || !screen || !call) return null;
    const token = getItem('token')
    return await axios.post(`${BASE_URL}/${application}/${screen}/${call}`, payload, {
        signal: new AbortController().signal,
        headers: {
            Authorization: `Bearer ${token?.token}`,
            userEmail: token.email
        }
    });
}

export function removeNullValuesFromPayload(filterState: any) {
    const validProperties = Object.keys(filterState).map((filter: any) => {
        return (filterState[`${filter}`] === null || filterState[`${filter}`] === "") ? null : filter;
    })
    const newFilterState: any = {}
    validProperties?.forEach((property: string) => {
        property !== null && (newFilterState[`${property}`] = filterState[`${property}`])
    })
    return newFilterState;
}