import { useEffect, useState } from 'react'
import { getCurrentSession } from './Components/Auth/authService'
import { LoginForm } from './Components/Auth/LoginForm';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Body from './Components/Body/Body';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

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
    // todo: replace with loading spinner
    return buildAppStructure(<div/>);
  }

  if (!idToken) {
    return buildAppStructure(<LoginForm onAuthenticated={(token) => setIdToken(token)} />);
  }

  return buildAppStructure(<Body/>);
}

function buildAppStructure(middle: React.JSX.Element): React.JSX.Element {
  return (
    <div>
    <CssBaseline />
    <Container 
      maxWidth={false}
      disableGutters 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Header/>
      {middle}
      <Footer/>
    </Container>
    </div>
  )
}

export default App
