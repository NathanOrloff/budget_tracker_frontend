import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentSession } from './authService';
import { BuildAppStructure } from '../Utils/general';
import { LoginForm } from './LoginForm';
import { useAccountIsRegisteredQuery } from '../../api/apiQueries';
import Spinner from '../Utils/Spinner/Spinner';
import Alert from '@mui/material/Alert';
import { getErrorMessage } from '../utils/error';
import { HOME } from '../Utils/pathes';

export default function LoginPage() {
    const [idToken, setIdToken] = useState<string | null>(null);
    const [checkingSession, setCheckingSession] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getCurrentSession()
        .then((token) => setIdToken(token))
        .catch(() => setIdToken(null))
        .finally(() => setCheckingSession(false));
    }, []);

    const { data, error, isLoading } = useAccountIsRegisteredQuery(undefined, {
        skip: !idToken, 
    });

    if (error) {
        return (
            <div>
                BuildAppStructure(setIdToken, <Spinner/>)
                <Alert severity="error">
                    {getErrorMessage(error)}
                </Alert>
            </div>
        );
    }

    if (checkingSession || isLoading) {
        return BuildAppStructure(setIdToken, <Spinner/>);
    }
    

    if (idToken) {
        if (!data?.is_registered) {
            return BuildAppStructure(setIdToken, <LoginForm onAuthenticated={(token) => setIdToken(token)} needsLink={true}/>);
        }
        goBack(navigate, location);
    }

    return BuildAppStructure(setIdToken, <LoginForm onAuthenticated={(token) => setIdToken(token)} needsLink={false}/>);
}

function goBack(navigate: any, location: any) {
    const origin = location.state?.from || HOME;
    navigate(origin, { replace: true })
}
