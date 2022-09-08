import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import IsAnon from "./components/IsAnon";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/signup" element={<IsAnon> <Signup /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <Login /> </IsAnon>} />
      </Routes>
    </div>
  );
}

export default App;
