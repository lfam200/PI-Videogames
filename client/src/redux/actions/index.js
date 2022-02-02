import {
  GET_ALL_VIDEOGAMES,
  GET_GAMES_SUCCESS,
  GET_GAMES_ERROR,
  SEARCH_GAMES,
  SEARCH_GAMES_SUCCESS,
  SEARCH_GAMES_ERROR,
  GET_GENRE,
  GET_GENRE_SUCCESS,
  GET_GENRE_ERROR,
  GET_PLATFORM,
  GET_PLATFORM_SUCCESS,
  GET_PLATFORM_ERROR,
  GET_GAME_ID,
  GET_GAME_ID_SUCCESS,
  GET_GAME_ID_ERROR,
  FILTER_BY,
  ORDER_BY,
  ADD_NEW_GAME,
  ADD_NEW_GAME_SUCCESS,
  ADD_NEW_GAME_ERROR,
} from "./../constants";

import axios from "axios";

const REACT_APP_API = "http://localhost:3001";

// GET VIDEOGAMES 
export const getAllGames = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_VIDEOGAMES,
  });
  return await axios
    .get(`${REACT_APP_API}/videogames`)
    .then((res) => {
      dispatch({
        type: GET_GAMES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_GAMES_ERROR,
      });
    });
};

export const searchGames = (input) => async (dispatch) => {
  dispatch({
    type: SEARCH_GAMES,
  });
  return await axios
    .get(`${REACT_APP_API}/videogames?name=${input}`)
    .then((r) => {
      dispatch({
        type: SEARCH_GAMES_SUCCESS,
        payload: r.data.slice(0,15),
      });
    })
    .catch((err) => {
      dispatch({
        type: SEARCH_GAMES_ERROR,
      });
    });
};

// GET GENRES FROM DB LOCAL
export const getGenres = () => async (dispatch) => {
  dispatch({
    type: GET_GENRE,
  });
  return await axios
    .get(`${REACT_APP_API}/genres`)
    .then((g) => {
      dispatch({
        type: GET_GENRE_SUCCESS,
        payload: g.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_GENRE_ERROR,
      });
    });
};

// GET PLATFORMS FROM DB LOCAL
export const getPlatforms = () => async (dispatch) => {
  dispatch({
    type: GET_PLATFORM,
  });
  return await axios
    .get(`${REACT_APP_API}/platforms`)
    .then((p) => {
      dispatch({
        type: GET_PLATFORM_SUCCESS,
        payload: p.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PLATFORM_ERROR,
      });
    });
};

// CREATE NEW GAME DB LOCAL
export const createNewGame = (body) => async (dispatch) => {
  dispatch({
    type: ADD_NEW_GAME,
    payload: body
  });
  return await axios
    .post(`${REACT_APP_API}/videogames`, body)
    .then((p) => {
      console.log(p.data);
      dispatch({
        type: ADD_NEW_GAME_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: ADD_NEW_GAME_ERROR,
      });
    });
};
export const addNewGameReset = (data) => async (dispatch) => {
  dispatch({
    type: ADD_NEW_GAME,
    payload: data
  });
}

// GETTING GAMES FROM DB
export const getGamesById = (id) => async (dispatch) => {
  dispatch({
    type: GET_GAME_ID,
  });
  return await axios
    .get(`${REACT_APP_API}/videogames/${id}`)
    .then((i) => {
      const result = i.data;
      dispatch({
        type: GET_GAME_ID_SUCCESS,
        payload: result,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_GAME_ID_ERROR,
      });
    });
};

// ORDER BY NAME AND RATING - ASC / DESC
export const orderBy = (sort) => (dispatch, getState) => {
  
  const order = getState().orderGames;
  const videogames = getState().videogamesState.videogames;
  const filterGames = getState().filterGames;

  let games;
  let dir;
  let gamesOrder;

  order.direction === '' 
    ? dir = 'ASC' 
    : order.direction === 'ASC' 
      ? dir = 'DESC'
      : dir = 'ASC';

  filterGames.filter === '' 
  ? games = videogames 
  : games = filterGames.games

  if(sort === 'az'){
    if(dir === 'ASC'){
      gamesOrder = games.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    }else{
      gamesOrder = games.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      });
    }
  }
  
  if(sort === 'rating'){
    if(dir === 'ASC'){
      gamesOrder = games.sort((a, b) => a.rating - b.rating);
    }else{
      gamesOrder = games.sort((a, b) => b.rating - a.rating);
    }
  }
  dispatch({
    type: ORDER_BY,
    payload: {
      games: [],
      filter: filterGames.filter,
      order: sort,
      direction: dir
    },
  });
  dispatch({
    type: ORDER_BY,
    payload: {
      games: gamesOrder,
      order: sort,
      direction: dir
    },
  });
};

// FILTER GENRES Y SOURCE
export const filterBy = (filter) => (dispatch, getState) => {
  let filterGames = [];
  if (filter === "All") {
    filterGames = getState().videogamesState.videogames;
  } else if(filter === "Api" || filter === "Created") {
    filterGames = getState().videogamesState.videogames.filter((game) => (game.source === filter)
  );
  } else {
    filterGames = getState().videogamesState.videogames.filter((game) =>
      (game.genres || []).includes(filter)
    );
  }
  dispatch({
    type: FILTER_BY,
    payload: {
      games: filterGames,
      filter: filter
    },
  });
};

//RESET FILTERS
export const resetFilters = () => (dispatch) => {
  dispatch({
    type: FILTER_BY,
    payload: {
      games: [],
      filter: ''
    },
  });
  dispatch({
    type: ORDER_BY,
    payload: {
      games: [],
      filter: '',
      order: '',
      direction: ''
    },
  });
}
