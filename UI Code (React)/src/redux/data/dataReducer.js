//Importing Action Types for fetching data
import { dataActionTypes } from "./dataActionType";

//Initial State
const initialState = {
  //State for storing Overall Age Rating Data for Movies
  movies_age_rating: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },

  //State for storing Overall Genres Data for Movies
  movies_genre: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },

  //State for storing Overall IMDB Rating Data for Movies
  movies_imdb_rating: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },

  //State for storing Overall Language Data for Movies
  movies_language: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },

  //State for storing Overall Age Rating Data for Series
  series_age_rating: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },

  //State for storing Overall Genre Data for Series
  series_genre: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },

  //State for storing Overall IMDB Rating Data for Series
  series_imdb_rating: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },

  //State for storing Overall Language Data for Series
  series_language: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },

  //State for storing User Data
  user_growth: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },

  //State for storing Market share Data
  market_share: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },

  //State for storing Price Data
  price: {
    information: [],
    netflix_data: [],
    prime_data: [],
    disney_data: [],
  },
};

//Reducers for updating global redux state
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case dataActionTypes.FETCH_MOVIE_AGE_RATING:
      return {
        ...state,
        movies_age_rating: action.data,
      };
    case dataActionTypes.FETCH_PRICE:
      return {
        ...state,
        price: action.data,
      };
    case dataActionTypes.FETCH_MOVIE_GENRE:
      return {
        ...state,
        movies_genre: action.data,
      };
    case dataActionTypes.FETCH_MOVIE_IMDB_RATING:
      return {
        ...state,
        movies_imdb_rating: action.data,
      };
    case dataActionTypes.FETCH_MOVIE_LANGUAGE:
      return {
        ...state,
        movies_language: action.data,
      };
    case dataActionTypes.FETCH_SERIES_AGE_RATING:
      return {
        ...state,
        series_age_rating: action.data,
      };
    case dataActionTypes.FETCH_SERIES_GENRE:
      return {
        ...state,
        series_genre: action.data,
      };
    case dataActionTypes.FETCH_SERIES_IMDB_RATING:
      return {
        ...state,
        series_imdb_rating: action.data,
      };
    case dataActionTypes.FETCH_SERIES_LANGUAGE:
      return {
        ...state,
        series_language: action.data,
      };
    case dataActionTypes.FETCH_USER_GROWTH:
      return {
        ...state,
        user_growth: action.data,
      };
    case dataActionTypes.FETCH_MARKET_SHARE:
      return {
        ...state,
        market_share: action.data,
      };
    default:
      return state;
  }
};

export default dataReducer;
