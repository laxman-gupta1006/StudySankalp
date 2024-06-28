import './App.css';
// import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Container from './components/Container';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
    <>
      <Navbar />
      <Container />
      <Footer />
    </>
    <div className="mobile-warning" id="mobileWarning">
      <p>This website is not optimized for mobile devices.</p>
    </div>
  </div>

  );
}

export default App;
