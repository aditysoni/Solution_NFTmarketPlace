import logo from './logo.svg';
import Navbar from './components/Navbar';
import './App.css';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import Home from './components/home';
import CreateNft from './components/createNft';
// import NFTPage from './components/NFTpage';

function App() {
  return (
    <div className="App">
    <Navbar/>
     <Home/>
    <SellNFT/>

    </div>
  );
}

export default App;
