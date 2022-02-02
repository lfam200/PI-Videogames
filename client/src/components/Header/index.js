import './styles.css';
import logo from '../../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Filter from '../Filter'
import Order from '../Order'
import SearchBar from '../SearchBar'



const Header = () => {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleClick = (to) => navigate(to);
  const resetPage = () => window.location.reload();

  if(pathname !== '/home'){
    return (
      <header>
        <nav>
            <img className="logo" src={logo} alt="logo" onClick={() => handleClick('/')} />
            <div className="main_header">
              <div>
                <p className="hidden">_</p>
                <button className="button" onClick={() => handleClick('/home')}>
                  Return to Home
                </button>
              </div>
            </div>
        </nav>
      </header>
    )
  }
  return(
    <header>
      <nav>
        <img className="logo" src={logo} alt="logo" onClick={() => handleClick('/')} />
        <div className="main_header">
          <div>
            <p className="hidden">_</p>
            <button className="button" onClick={() => handleClick('/Addgame')}>
              Create Game
            </button>
          </div>
          <div>
            <p>Order By: </p>
            <Order/>
          </div>
          <div>
            <p>Filter By: </p>
            <Filter/>
          </div>
          
        </div>
        <div className="main_header">
          <SearchBar/>
        </div>
        <button className="button" onClick={resetPage}>
          Reset Filters
        </button>
      </nav>
    </header>
  )
}

export default Header;