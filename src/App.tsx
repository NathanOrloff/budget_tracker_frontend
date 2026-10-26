import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Budget from './Components/Budget/Budget';
import LoginPage from './Components/Auth/LoginPage';
import ViewPage from './Components/View/ViewPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/view" element={<ViewPage />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}



export default App
