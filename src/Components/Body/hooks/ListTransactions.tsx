import { useMemo } from "react";
import { useListTransactionsQuery } from "../../../api/apiQueries";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { getErrorMessage } from "../../utils/error";

export function useListTransactions(daysBack: number) {
    const fromDate = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() - daysBack);
        return d.toISOString().split('T')[0];
    }, [daysBack]);

    const result = useListTransactionsQuery(fromDate);
    
    return {
        data: result.data,
        error: getErrorMessage(result.error),
        isLoading: result.isLoading        
    }
}
