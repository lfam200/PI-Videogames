import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getGamesById } from "./../../redux/actions";
import videoGame from "../../assets/videogame01.png";

import Loader from "../Loader";
import Header from "../Header";


import "./styles.css";


const VideoGameDetails = () => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const { gameDetail, loading, error } = useSelector((state) => state.gamesById);

  useEffect(() => {
    dispatch(getGamesById(id));
  }, []);

  return (
    <>
      <Header/>
      <div className="container_home">
      { loading 
        ? <Loader /> 
        : error 
          ? <div>{error}</div>
          : 
            
        <div className="container">  
          
          <div className="videogame">
            <div className="videogame_detail">
              <h1 className="videogame_title">{gameDetail.name}</h1>
              <h2 className="videogame_subtitle">Description</h2>
              <p>{gameDetail.description}</p>
              <h2 className="videogame_subtitle">Released</h2>
              <p>{gameDetail.released}</p>
              <h2 className="videogame_subtitle">Genres</h2>
              <p>{gameDetail.genres}</p>
              <h2 className="videogame_subtitle">Platforms</h2>
              <p>{gameDetail.platforms}</p>
              <h2 className="videogame_subtitle">Rating</h2>
              <p>{gameDetail.rating}</p>
            </div>
            <figure className="videogame_img">
              <img
                src={gameDetail.imageUrl ? gameDetail.imageUrl : videoGame}
                alt="no found"
              />
            </figure>  
          </div>
        </div>
      }
      </div>
    </>
  )
}

export default VideoGameDetails;