import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGenres, getPlatforms, createNewGame } from "../../redux/actions";

import './styles.css';
import Header from '../Header'

const Addgame = () => {
  const navigate = useNavigate();
  //Initial Values
  const values = {
    name: "",
    description: "",
    released: "",
    rating: 0,
    genres: [],
    platforms: [],
    imageUrl: "",
  };
  //Initial values for errors
  const errors = {
    name: "",
    description: "",
    rating: ""
  };

  const [game, setGame] = useState(values);
  const [error, setError] = useState(errors);
  const dispatch = useDispatch();

  const genres = useSelector((state) => state.genresState.genres);
  const platforms = useSelector((state) => state.platformsState.platforms);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);

  //Validate form
  const validate = (data) => {
    let res = true;
    let name = ""
    let description = ""
    let rating = ""

    if(data.name === '') {
      name = 'The name field is required';
      res = false;
    }
    if(data.description === '') {
      description = 'The description field is required';
      res = false;
    }
    if(!/^[0-4](\.[0-9]{1,2})?$|^[5]+(\.[0]{2})?$/.test(data.rating)) {
      rating = 'Enter a valid number between 0 and 5, maximum 2 decimal places.';
      setGame({ ...game, rating: 0})
      res = false;
    }

    setError({
      name: name,
      description: description,
      rating: rating
    })
    return res;
  }

  // Submit Form Create Game
  const createGame = (e) => {
    e.preventDefault();
    if (validate(game)){
      const data = {
        name: game.name,
        description: game.description,
        released: game.released,
        rating: game.rating,
        genres: game.genres,
        platforms: game.platforms,
        imageUrl: game.imageUrl,
      };
      dispatch(createNewGame(data));
      setGame(values);
      navigate('/home');
    };
  };

  //Set values in game object
  const handleInputChange = (e) => {
    if (e.target.name === "genres" || e.target.name === "platforms") {
      const arr = game[e.target.name];
      setGame({
        ...game,
        [e.target.name]: arr.concat(e.target.value),
      });
    } else {
      setGame({
        ...game,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div>
      <Header/>
      <div className="container_home">
        <div className="container_form">
          <h2>Create a new videogame</h2>
          <form onSubmit={createGame}>
            <div>
              <label>Name</label>
              <input
                value={game.name}
                onChange={handleInputChange}
                name="name"
                type="text"
                autoFocus
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                onChange={handleInputChange}
                value={game.description}
                rows="10"
                name="description"
                type="text"
              ></textarea>
            </div>
            <div className="form_group">
              <div>
                <label>Released</label>
                <input
                  onChange={handleInputChange}
                  value={game.released}
                  name="released"
                  type="date"
                />
              </div>
              <div>
                <label>Rating</label>
                <input
                  onChange={handleInputChange}
                  value={game.rating}
                  name="rating"
                  type="text"
                />
              </div>
            </div>
            <div className="form_group">
              <div>
                <label>Select the platforms</label>
                <div className="select_genres">
                  {platforms.map((p) => (
                    <div key={p.id}>
                      <label className="container_checkbox">
                        {p.name}
                        <input
                          onChange={handleInputChange}
                          type="checkbox"
                          name="platforms"
                          value={p.name}
                        ></input>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="select_field">
                <label>Select the genres</label>
                <div className="select_genres">
                  {genres.map((g) => (
                    <div key={g.id}>
                      <label className="container_checkbox">
                        {g.name}
                        <input
                          onChange={handleInputChange}
                          type="checkbox"
                          name="genres"
                          value={g.name}
                        ></input>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label>Image URL</label>
              <input
                value={game.imageUrl}
                onChange={handleInputChange}
                name="imageUrl"
                type="text"
              />
            </div>
            <div className="validation">
              <ul>
                {error.name ? <li>{error.name}</li>: null}
                {error.description ? <li>{error.description}</li>: null}
                {error.rating ? <li>{error.rating}</li>: null}
              </ul>
            </div>
            <div className="form_submit">
              <button
                className="button"
                name="submit"
                type="submit"
                id="contact-submit"
                data-submit="...Sending"
              > 
                Save game!
              </button>
            </div>
          </form>
        </div>
          
      </div>
    </div>
  )
}

export default Addgame;