import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCurrentSession } from '../Components/Auth/authService';
import { CreateLinkTokenOutput, ExchangePublicTokenInput, TransactionOutput } from './types';

export const budgetAppApi = createApi({
    reducerPath: 'budgetAppApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://2kipv3tlo6.execute-api.us-west-2.amazonaws.com/prod/',
        prepareHeaders: async (headers, _) => {
            const token = await getCurrentSession();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    
    endpoints: (build) => ({
        listTransactions: build.query<TransactionOutput, string>({
            query: (fromDate) => ({
                url: `transactions`,
                params: { from_date: fromDate },
            }),
        }),

        createLinkToken: build.mutation<CreateLinkTokenOutput, string>({
            query: () => `create-link-token`
        }),

        exchangePublicToken: build.mutation<void, ExchangePublicTokenInput>({
            query: (input) => ({
                url: `exchange-public-token`,
                params: { public_token:  input.public_token, institution_name: input.institution_name},
            }),
        })
    }),
});

export const {
    useListTransactionsQuery,
    useCreateLinkTokenMutation,
    useExchangePublicTokenMutation
} = budgetAppApi