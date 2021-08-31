//Importing Action Types
import { primeActionTypes } from "./primeActionType";

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
};

//Creating Reducer for updating redux state
const primeReducer = (state = initialState, action) => {
  switch (action.type) {
    case primeActionTypes.FETCH_PRIME_MOVIE_GENRE:
      return {
        ...state,
        movies_genre: action.data,
      };
    case primeActionTypes.FETCH_PRIME_MOVIE_LANGUAGE:
      return {
        ...state,
        movies_language: action.data,
      };
    case primeActionTypes.FETCH_PRIME_SERIES_GENRE:
      return {
        ...state,
        series_genre: action.data,
      };
    case primeActionTypes.FETCH_PRIME_SERIES_LANGUAGE:
      return {
        ...state,
        series_language: action.data,
      };
    default:
      return state;
  }
};

export default primeReducer;
