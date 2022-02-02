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

const initialState = {
  videogamesState: {
    videogames: [],
    error: null,
    loading: false,
  },
  genresState: {
    genres: [],
    error: null,
    loading: false,
  },
  platformsState: {
    platforms: [],
    error: null,
    loading: false,
  },
  gamesById: {
    gameDetail: [],
    error: null,
    loading: false,
  },
  addNewGame: {
    game: {},
    error: null,
    success: null,
  },
  genres: [],
  platforms: [],
  filterGames: {
    games: [],
    filter: '', 
  },
  orderGames: {
    order: "",
    direction: ""
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videogamesState: {
          videogames: [],
          error: null,
          loading: true,
        },
      };
    case GET_GAMES_SUCCESS:
      return {
        ...state,
        videogamesState: {
          videogames: action.payload,
          error: null,
          loading: false,
        },
      };
    case GET_GAMES_ERROR:
      return {
        ...state,
        videogamesState: {
          videogames: [],
          error: true,
          loading: false,
        },
      };
    case SEARCH_GAMES:
      return {
        ...state,
        videogamesState: {
          videogames: [],
          error: null,
          loading: true,
        },
      };
    case SEARCH_GAMES_SUCCESS:
      return {
        ...state,
        videogamesState: {
          videogames: action.payload,
          error: null,
          loading: false,
        },
      };
    case SEARCH_GAMES_ERROR:
      return {
        ...state,
        videogamesState: {
          videogames: [],
          error: true,
          loading: false,
        },
      };
    case GET_GENRE:
      return {
        ...state,
        genresState: {
          genres: [],
          error: null,
          loading: true,
        },
      };
    case GET_GENRE_SUCCESS:
      return {
        ...state,
        genresState: {
          genres: action.payload,
          error: null,
          loading: false,
        },
      };
    case GET_GENRE_ERROR:
      return {
        ...state,
        genresState: {
          genres: [],
          error: true,
          loading: false,
        },
      };
    case GET_PLATFORM:
      return {
        ...state,
        platformsState: {
          platforms: [],
          error: null,
          loading: true,
        },
      };
    case GET_PLATFORM_SUCCESS:
      return {
        ...state,
        platformsState: {
          platforms: action.payload,
          error: null,
          loading: false,
        },
      };
    case GET_PLATFORM_ERROR:
      return {
        ...state,
        platformsState: {
          platforms: [],
          error: true,
          loading: false,
        },
      };
    case ADD_NEW_GAME:
      return {
        ...state,
        addNewGame: {
          game: action.payload,
          error: null,
        },
      };
    case ADD_NEW_GAME_SUCCESS:
      return {
        ...state,
        addNewGame: {
          error: false,
          success: true,
        },
      };
    case ADD_NEW_GAME_ERROR:
      return {
        ...state,
        addNewGame: {
          error: true,
          success: false,
        },
      };
    
    case GET_GAME_ID:
      return {
        ...state,
        gamesById: {
          gameDetail: [],
          error: null,
          loading: true,
        },
      };
    case GET_GAME_ID_SUCCESS:
      return {
        ...state,
        gamesById: {
          gameDetail: action.payload,
          error: null,
          loading: false,
        },
      };
    case GET_GAME_ID_ERROR:
      return {
        ...state,
        gamesById: {
          gameDetail: [],
          error: true,
          loading: false,
        },
      };

    case ORDER_BY:
      return {
        ...state,
        filterGames: {
          games: action.payload.games,
          filter: action.payload.filter
        },
        orderGames: {
          order: action.payload.order,
          direction: action.payload.direction,
        },
      };
    case FILTER_BY:
      return {
        ...state,
        filterGames: {
          games: action.payload.games,
          filter: action.payload.filter,
        }
      };
    default:
      return state;
  }
};

export default rootReducer;
