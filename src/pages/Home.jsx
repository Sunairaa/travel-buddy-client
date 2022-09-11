import "../App.css";
import itinerariesPic from '../assets/itineraries.png'
import plan from '../assets/plan.png'
import ComplexButton from "../components/ComplexButton";

import {Link} from 'react-router-dom'

function Home() {
  return (
    <div style={{flex:1}}>

      <div style={{height: '50%'}}>
        <Link to='/itineraries'>
          <ComplexButton 
            title='See all itineraries'
            imageUrl={itinerariesPic}
          />
        </Link>
      </div>

      <div style={{height: '50%'}}>
      <Link to='/new-itinerary'>
        <ComplexButton 
          title='Create a new itinerary'
          imageUrl={plan}
        />
      </Link>

      </div>

    </div>
  );
}

export default Home;


