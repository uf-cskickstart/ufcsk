import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/Footer.js';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <img src="https://placehold.co/1600x500" alt="Placeholder Image" />
      <Footer className="footer"></Footer>
    </div>
  );
}

export default App;
