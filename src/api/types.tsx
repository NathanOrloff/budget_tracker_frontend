export type TransactionOutput = {
    id: string,
    account_id: string,
    name: string,
    merchant_name: string,
    acount: number,
    date: string, // Date
    personal_finance_category: string,
    created_at: string, // Date
    updated_at: string // Date
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