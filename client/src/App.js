import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home";
import  { CreatePosts } from "./pages/create_post";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-posts" element={< CreatePosts/>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
