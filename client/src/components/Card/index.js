import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import videoGame from "../../assets/videogame01.png";

const Card = ({ data }) => {
  let navigate = useNavigate();
  const handleGetId = () => navigate(`/videogame/${data.id}`);

  return (
    <div className="card">
      <div className="image">
        <img src={data.image ? data.image : videoGame} alt="no found" />
      </div>
      <div className="info">
        <h3>{data.name}</h3>
        <p>{data.genres && data.genres}</p>
        <p>Rating: {data.rating && data.rating}</p>
        <div>
          <button className="button" onClick={handleGetId} type="submit">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
