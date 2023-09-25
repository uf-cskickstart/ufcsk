import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Home from './pages/Home/Home.js';
import Board from './pages/Board/Board.js'

//Routing 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/ufcsk" element={<Home/>}></Route>
          <Route path="/ufcsk/home" element={<Home/>}></Route>
          <Route path="/ufcsk/board" element={<Board/>}></Route>
        </Routes>
        <Footer className="footer"></Footer>
      </Router>
    </div>
  );
}

export default App;
