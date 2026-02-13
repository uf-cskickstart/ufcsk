import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Home from './pages/Home/Home.js';
import Board from './pages/Board/Board.js'
import Calendar from './pages/Calendar/Calendar.js';
import Program from './pages/Program/Program.js';
import CSK2024 from './pages/CSK2024/CSK2024.js';
import CSK2025 from './pages/CSK2025/CSK2025.js';

//Routing 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/board" element={<Board/>}></Route>
          <Route path="/calendar" element={<Calendar/>}></Route>
          <Route path="/program" element={<Program/>}></Route>
          <Route path="/CSK2024" element={<CSK2024/>}></Route>
          <Route path="/CSK2025" element={<CSK2025/>}></Route>

        </Routes>
        <Footer className="footer"></Footer>
      </Router>
    </div>
  );
}

export default App;
