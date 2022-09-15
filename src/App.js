import './App.css';
import User from './components/contestant/Contestant';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './pages/checkout/Checkout';
import Voting from './pages/voting/Voting';
import Home from './pages/home/Home';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/vote" element={<Voting/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
