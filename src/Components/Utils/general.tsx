import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";


export function BuildAppStructure(fn: any, middle: React.JSX.Element): React.JSX.Element {
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
      <Header setIdToken={fn} />
      {middle}
      <Footer/>
    </Container>
    </div>
  )
}
