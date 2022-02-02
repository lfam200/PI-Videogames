import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Loader from "./../Loader";
import "./styles.css";

const Cards = ({ games, loading, error }) => {
  const navigate = useNavigate();
  const handleClick = (to) => navigate(to);

  if (!loading && !games.length) {
    return (
      <>
        <h1 className="text_main">Sorry, no game found :'(</h1>
        <div>
          <button className="button"  onClick={() => handleClick('/')}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Return to PRINCIPAL!
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="container">
      <div className="cards">
        {loading ? (
          <Loader />
        ) : error ? (
          <div>{error}</div>
        ) : (
          games.map((data, id) => <Card data={data} key={id} />)
        )}
      </div>
    </div>
  );
};

export default Cards;
