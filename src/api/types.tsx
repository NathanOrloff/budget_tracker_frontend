export type TransactionOutput = {
    id: string,
    account_id: string,
    name: string,
    merchant_name: string,
    amount: number,
    date: Date,
    personal_finance_category: PersonalFinanceCategory,
    created_at: Date,
    updated_at: Date
}

export type ExchangePublicTokenInput = {
    public_token: string,
    institution_name: string
}

export type CreateLinkTokenOutput = {
    link_token: string
}

export type AccountIsRegisteredOutput = {
    is_registered: boolean
}

export type PersonalFinanceCategory = 
    "INCOME" | "TRANSFER_IN" | "TRANSFER_OUT" | "LOAN_PAYMENTS" | "BANK_FEES" | 
    "ENTERTAINMENT" | "FOOD_AND_DRINK" | "GENERAL_MERCHANDISE" | "HOME_IMPROVEMENT" | 
    "MEDICAL" | "PERSONAL_CARE" | "GENERAL_SERVICES" | "GOVERNMENT_AND_NON_PROFIT" | 
    "TRANSPORTATION" | "TRAVEL" | "RENT_AND_UTILITIES"; 
