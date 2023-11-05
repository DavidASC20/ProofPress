import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import  { CreatePosts } from "./pages/create_post";
import { HowTo } from './pages/how_to';
import BuyTokensPage from './pages/BuyTokens';
import { Navbar } from "./components/navbar";
import BuyTokensPage from './pages/BuyTokens';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-posts" element={< CreatePosts/>} />
          <Route path="/how-to" element={<HowTo/>} />
          <Route path="/buy-token" element={<BuyTokensPage/>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
