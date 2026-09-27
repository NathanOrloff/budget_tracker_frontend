import React, { useEffect, useState } from 'react'
import { useCreateLinkTokenMutation, useExchangePublicTokenMutation } from '../../api/apiQueries';
import { getErrorMessage } from '../utils/error';
import { PlaidLinkOnExitMetadata, PlaidLinkOnSuccessMetadata, usePlaidLink } from 'react-plaid-link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Mode } from './LoginForm';

export type PlaidButtonProps = {
    setMode: (mode: Mode) => void
}

export default function PlaidButton({ setMode }: PlaidButtonProps) {
    const [createLinkToken] = useCreateLinkTokenMutation();
    const [exchangePublicToken] = useExchangePublicTokenMutation();
    
    const [linkToken, setLinkToken] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        createLinkToken()
            .then((data) => {
                setLinkToken(data.data?.link_token)
            })
            .catch((error) => {
                setError(getErrorMessage(error))
            })
    }, [])

    const config = {
        token: linkToken ?? '',
        onSuccess: async (public_token: string | null, metadata: PlaidLinkOnSuccessMetadata) => {
            try {

                if (!public_token) {
                    return;
                }

                await exchangePublicToken({
                    public_token,
                    institution_name: metadata.institution?.name ?? 'Unknown Institution'
                })
            } catch (error: any) {
                setError(getErrorMessage(error))
            } finally {
                setMode('signIn')
            }
        },
        onExit: (error: any, metadata: PlaidLinkOnExitMetadata) => {
            if (error) {
                setError(getErrorMessage(error))
            }
            setMode('signIn')
        }
    }

    const { open, ready } = usePlaidLink({
        ...config,
        token: linkToken as string
    });

    return (
        <React.Fragment>
            <Button variant="contained" onClick={() => open()} disabled={ready}>
                Link to Bank Account
            </Button>
            { error && (
                <Alert severity="error">
                    {error}
                </Alert>
            ) }
        </React.Fragment>
    )
}
