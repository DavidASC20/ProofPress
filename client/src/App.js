import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import  { CreatePosts } from "./pages/create_post";
import { HowTo } from './pages/how_to';
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-posts" element={< CreatePosts/>} />
          <Route path="/how-to" element={<HowTo/>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
