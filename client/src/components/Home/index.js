import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';

import { getAllGames,addNewGameReset, resetFilters } from "../../redux/actions";

import './styles.css';
import Header from '../Header'
import Cards from '../Cards'
import Pagination from '../Pagination'

const Home = () => {
  const dispatch = useDispatch();

  const { videogames, loading, error } = useSelector((state) => state.videogamesState);

  const filterGames = useSelector((state) => state.filterGames);
  const addGame = useSelector((state) => state.addNewGame);

  let allGames; 

  useEffect( () => {
    dispatch(getAllGames());
    dispatch(addNewGameReset({ game:{},error:null,success:null}));
    dispatch(resetFilters())
  },[]);

  //Compare filter games
  filterGames.filter === ''
  ? (allGames = videogames)
  : (allGames = filterGames.games);
  
  const pagination = (e, nro) => {
    e.preventDefault();
    setCurrentPage(nro);
  };
  
  const [currentPage, setCurrentPage] = useState(1);
  const lastElement = currentPage * 15;
  const firstElement = lastElement - 15;
  let page = allGames.slice(firstElement, lastElement);
  
  return (
    <div>
      <Header/>
      <div className="container_home">
        <div>
          { addGame.error ? <div className="error">COULD NOT CREATE VIDEO GAME</div>: null }
          { addGame.success ? <div className="success">THE VIDEO GAME WAS SUCCESSFULLY CREATED</div>:null }
          <Cards games={page} loading={loading} error={error}/>
          <Pagination cards={15} videogames={allGames.length} pagination={pagination}/>
        </div>
      </div>
    </div>
  )
}

export default Home;