import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box sx={{ flexShrink: 0 }}>
      <AppBar position="static">
        <Toolbar sx={{
          justifyContent: 'center', 
          gap: 2
        }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => {
              window.open("https://www.linkedin.com/in/nathan-orloff/", "_blank", "noopener,noreferrer")
            }}
          >
            <LinkedInIcon/>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => {
              window.open("https://github.com/NathanOrloff", "_blank", "noopener,noreferrer")
            }}
          >
            <GitHubIcon/>
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            role="link"
            href='mailto:nathancorloff@gmail.com'
          >
            <EmailIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
