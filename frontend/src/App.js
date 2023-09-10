import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';
import Banner from './assets/banner-image.png';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <img src={Banner} alt="Placeholder Image" />
      <Footer className="footer"></Footer>
    </div>
  );
}

export default App;
