import "../App.css";
import itinerariesPic from '../assets/itineraries.png'
import plan from '../assets/plan.png'
import travelTips from '../assets/travelTips.jpg'
import ComplexButton from "../components/ComplexButton";
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div style={{flex:1}}>

      <div style={{height: '34%'}}>
        <Link to='/itineraries'>
          <ComplexButton 
            title='Explore itineraries'
            imageUrl={itinerariesPic}
          />
        </Link>
      </div>

      <div style={{height: '33%'}}>
      <Link to='/new-itinerary'>
        <ComplexButton 
          title='Create an itinerary'
          imageUrl={plan}
        />
      </Link>
      </div>

      <div style={{height: '33%'}}>
      <Link to='/traveltips'>
        <ComplexButton 
          title='Explore travel tips'
          imageUrl={travelTips}
        />
      </Link>
      </div>

    </div>
  );
}

export default Home;


