import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../src/components/Navbar";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import Home from "./pages/Home";
import NewItinerary from "./pages/NewItinerary";
import ItineraryEdit from "./pages/ItineraryEdit";
import Footer from "./components/Footer";
import Itineraries from "./pages/Itineraries";
import ItineraryDetails from "./pages/ItineraryDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/new-itinerary" element={<IsPrivate> <NewItinerary /> </IsPrivate>} />
        <Route path="/itineraries/edit/:itineraryId" element={<IsPrivate> <ItineraryEdit /> </IsPrivate>}/>
        <Route path="/signup" element={<IsAnon> <Signup /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <Login /> </IsAnon>} />
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/itineraries' element={<Itineraries />}></Route>
        <Route path='/itineraries/:id' element={<ItineraryDetails />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
