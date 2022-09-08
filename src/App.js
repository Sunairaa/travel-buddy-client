import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={ <Signup/> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </div>
  );
}

export default App;
