import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Home from './pages/Home/Home.js';
import Board from './pages/Board/Board.js'
import Calendar from './pages/Calendar/Calendar.js';
import Program from './pages/Program/Program.js';

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
        </Routes>
        <Footer className="footer"></Footer>
      </Router>
    </div>
  );
}

export default App;
