import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string {
    if (!error) {
        return ''
    }

    if ('message' in error) {
        return error.message ?? '';
    }

    if ('status' in error) {
        if (typeof error.data === 'string') {
            return error.data;
        }
        if (error.data && typeof error.data === 'object' && 'message' in error.data) {
            return String((error.data as { message: unknown }).message);
        }
        return JSON.stringify(error.data) || `Error status: ${error.status}`; 
    }

    return 'An unknown error occurred';
}
