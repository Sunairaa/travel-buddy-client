import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../src/components/Navbar";
import Signup from "../src/pages/Signup";
import Login from "../src/pages/Login";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import Home from "./pages/Home";
import Index from "./pages/Index";
import NewItinerary from "./pages/NewItinerary";
import ItineraryEdit from "./pages/ItineraryEdit";
import Footer from "./components/Footer";
import Itineraries from "./pages/Itineraries";
import ItineraryDetails from "./pages/ItineraryDetails";
import Profile from "./pages/Profile";
import TravelTips from "./pages/TravelTips";
import NewTravelTip from "./pages/NewTravelTip";
import UserSpecificItineraries from "./pages/UserSpecificItineraries";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/home" element={<IsPrivate> <Home /> </IsPrivate> } />
          <Route path="/" element={<Index /> }></Route>
          <Route path="/new-itinerary" element={<IsPrivate> <NewItinerary /> </IsPrivate>} />
          <Route path="/itineraries/edit/:itineraryId" element={<IsPrivate> <ItineraryEdit /> </IsPrivate>}/>
          <Route path="/signup" element={<IsAnon> <Signup /> </IsAnon>} />
          <Route path="/login" element={<IsAnon> <Login /> </IsAnon>} />
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/profile/itineraries' element={<UserSpecificItineraries />}></Route>
          <Route path='/itineraries' element={<Itineraries />}></Route>
          <Route path='/itineraries/:id' element={<IsPrivate> <ItineraryDetails /> </IsPrivate>}></Route>
          <Route path='/traveltips' element={ <TravelTips />}></Route>
          <Route path="/new-travel-tip" element={<IsPrivate> <NewTravelTip /> </IsPrivate>} />
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      <Footer />
    </div>
  );
}

export default App;
