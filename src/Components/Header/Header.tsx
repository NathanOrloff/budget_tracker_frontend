import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { getCurrentUserAttributes, signOut } from '../Auth/authService';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

type HeaderParams = {
  setIdToken: (token: string | null) => void,
}

export default function Header({ setIdToken }: HeaderParams) {
  const [userAttr, setUserAttr] = useState<CognitoUserAttribute[] | null>(null);

  useEffect(() => {
    getCurrentUserAttributes()
      .then((attributes) => setUserAttr(attributes))
      .catch((err) => console.log(err))
  }, []);

  function signUserOut() {
    setIdToken(null);
    signOut();
  }

  let button = <Button color="inherit">Login</Button>
  if (userAttr) {
    const email = userAttr.find(attr => attr.getName() === 'email')?.getValue();
    const emailName = email?.split('@')[0]
    button = <Button color="inherit" onClick={() => signUserOut()}>{emailName}</Button>
  }

  return (
    <Box sx={{ flexShrink: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Budget App
          </Typography>
          {button}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
