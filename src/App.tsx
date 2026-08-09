import { useEffect, useState } from 'react'
import { getCurrentSession } from './Components/Body/Auth/authService'
import { LoginForm } from './Components/Body/Auth/LoginForm';

function App() {
  const [idToken, setIdToken] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    getCurrentSession()
      .then((token) => setIdToken(token))
      .catch(() => setIdToken(null))
      .finally(() => setCheckingSession(false));
  })

  if (checkingSession) {
    return <div>Loading...</div>;
  }

  if (!idToken) {
    return <LoginForm onAuthenticated={(token) => setIdToken(token)} />;
  }

  return (
    <div>
      app
    </div>
  );
}

export default App
