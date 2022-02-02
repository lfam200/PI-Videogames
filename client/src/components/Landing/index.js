import { Link } from 'react-router-dom';
import './styles.css';
import videogame from './../../assets/videogame01.png';
import press_start from './../../assets/press_start.png';

const Landing = () => (
  <div className="container_landing">
    <div>
      <h2 className="title_landing">Henry <br/> Videogames</h2>
      <img className="image_landing" src={videogame} alt="Videogames" />
      <Link to="/home">
        <img className="button_landing"  alt="Press Start" src={press_start}/>
      </Link>
    </div>
  </div>
)

export default Landing;