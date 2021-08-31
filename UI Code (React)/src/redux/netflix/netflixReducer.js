//Importing Action Types
import { netflixActionTypes } from "./netflixActionType";

//Initial State
const initialState = {
  movies_genre: {
    information: [],
    ott_data: [],
  },

  movies_language: {
    information: [],
    ott_data: [],
  },

  series_genre: {
    information: [],
    ott_data: [],
  },

  series_language: {
    information: [],
    ott_data: [],
  },

  map_data: {
    code: [],
    subs: [],
  },
};

//Creating Reducer for updating redux state
const netflixReducer = (state = initialState, action) => {
  switch (action.type) {
    case netflixActionTypes.FETCH_NETFLIX_MOVIE_GENRE:
      return {
        ...state,
        movies_genre: action.data,
      };
    case netflixActionTypes.FETCH_NETFLIX_MOVIE_LANGUAGE:
      return {
        ...state,
        movies_language: action.data,
      };
    case netflixActionTypes.FETCH_NETFLIX_SERIES_GENRE:
      return {
        ...state,
        series_genre: action.data,
      };
    case netflixActionTypes.FETCH_NETFLIX_SERIES_LANGUAGE:
      return {
        ...state,
        series_language: action.data,
      };
    case netflixActionTypes.FETCH_NETFLIX_MAP:
      return {
        ...state,
        map_data: action.data,
      };

    default:
      return state;
  }
};

export default netflixReducer;
