import { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { resetFilters, searchGames } from "../../redux/actions";

import './styles.css';

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetFilters())
    dispatch(searchGames(name));
    setName("");
  };
  return (
    <div className="search_bar">
      <p>Search Game:</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="search_input" 
          value={name}
          onChange={(e) => setName(e.target.value)}  
        />
      </form>
    </div>
    
  )
}

export default SearchBar;