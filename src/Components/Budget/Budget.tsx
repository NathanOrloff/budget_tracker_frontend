import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentSession } from '../Auth/authService';
import { BuildAppStructure } from '../Utils/general';
import Spinner from '../Utils/Spinner/Spinner';
import { LOGIN } from '../Utils/pathes';
import Body from './Body';

export default function Budget() {
  const [idToken, setIdToken] = useState<string | null>(null);
    const [checkingSession, setCheckingSession] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentSession()
        .then((token) => setIdToken(token))
        .catch(() => setIdToken(null))
        .finally(() => setCheckingSession(false));
    }, []);

    
    if (checkingSession) {
        return BuildAppStructure(setIdToken, <Spinner/>);
    }

    if (!idToken) {
        navigate(LOGIN, { replace: true });
    } 

    return BuildAppStructure(setIdToken, <Body/>);
}
