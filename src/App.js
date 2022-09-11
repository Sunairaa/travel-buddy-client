import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import Home from "./pages/Home";
import NewItinerary from "./pages/NewItinerary";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/new-itinerary" element={<IsPrivate> <NewItinerary /> </IsPrivate>} />
        <Route path="/signup" element={<IsAnon> <Signup /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <Login /> </IsAnon>} />
      </Routes>
    </div>
  );
}

export default App;
