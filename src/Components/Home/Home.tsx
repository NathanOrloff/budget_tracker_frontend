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
    }, []);

    
    if (checkingSession) {
        return BuildAppStructure(setIdToken, <Spinner/>);
    }

    useEffect(() => {
        if (!idToken) {
            navigate(LOGIN, { replace: true });
        } else {
            navigate(VIEW, { replace: true });
        }
    }, [idToken])
    

    // shouldn't reach this
    return BuildAppStructure(setIdToken, <Spinner/>);
}
