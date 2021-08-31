//Importing Action Types
import { disneyActionTypes } from "./disneyActionType";

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
const disneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case disneyActionTypes.FETCH_DISNEY_MOVIE_GENRE:
      return {
        ...state,
        movies_genre: action.data,
      };
    case disneyActionTypes.FETCH_DISNEY_MOVIE_LANGUAGE:
      return {
        ...state,
        movies_language: action.data,
      };
    case disneyActionTypes.FETCH_DISNEY_SERIES_GENRE:
      return {
        ...state,
        series_genre: action.data,
      };
    case disneyActionTypes.FETCH_DISNEY_SERIES_LANGUAGE:
      return {
        ...state,
        series_language: action.data,
      };
    default:
      return state;
  }
};

export default disneyReducer;
