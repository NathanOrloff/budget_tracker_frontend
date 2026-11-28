import { useEffect, useState } from 'react'
import { getCurrentSession } from '../Auth/authService'
import { BuildAppStructure } from '../Utils/general';
import Spinner from '../Utils/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { LOGIN, VIEW } from '../Utils/pathes';

export default function Home() {
    const [idToken, setIdToken] = useState<string | null>(null);
    const [checkingSession, setCheckingSession] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentSession()
        .then((token) => setIdToken(token))
        .catch(() => setIdToken(null))
        .finally(() => setCheckingSession(false));

        if (!idToken) {
            navigate(LOGIN, { replace: true });
        } 
    }, []);

    
    if (checkingSession) {
        return BuildAppStructure(setIdToken, <Spinner/>);
    }

    navigate(VIEW, { replace: true });

    // shouldn't reach this
    return BuildAppStructure(setIdToken, <Spinner/>);
}
