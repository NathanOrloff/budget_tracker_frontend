import { configureStore } from "@reduxjs/toolkit";
import { budgetAppApi } from "../api/apiQueries";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [budgetAppApi.reducerPath]: budgetAppApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(budgetAppApi.middleware)
})

setupListeners(store.dispatch)
