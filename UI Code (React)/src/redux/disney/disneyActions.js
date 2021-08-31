//Importing action types for disney+hotstar data
import { disneyActionTypes } from "./disneyActionType";

//Importing Utility functions for fetching data
import { getData2 } from "../utils";

//Defining URLs
const DisneyMovieLanguage =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/Disney/lang-movie-disney.csv?token=AOKKBVHOZXL2BBJXDFRSQWDBGSO5Y";
const DisneyMovieGenre =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/Disney/genre-movie-disney.csv?token=AOKKBVAZ7HOOJ45LMRARZP3BGSO7U";
const DisneySeriesLanguage =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/Disney/lang-series-disney.csv?token=AOKKBVAAGCVBBL2Z7H74PPLBGSPHI";
const DisneySeriesGenre =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/Disney/genre-series-disney.csv?token=AOKKBVFQXLTVV5SJVI7NTNTBGSPIQ";

//Creating Actions for fetching Disney+ Hotstar Data for the detailed Disney+ Hotstar Analyis Section
export const fetchDisneyMovieLanguage = () => {
  return (dispatch) => {
    getData2(DisneyMovieLanguage).then((data) => {
      dispatch({ type: disneyActionTypes.FETCH_DISNEY_MOVIE_LANGUAGE, data });
    });
  };
};

export const fetchDisneyMovieGenre = () => {
  return (dispatch) => {
    getData2(DisneyMovieGenre).then((data) => {
      dispatch({ type: disneyActionTypes.FETCH_DISNEY_MOVIE_GENRE, data });
    });
  };
};

export const fetchDisneySeriesLanguage = () => {
  return (dispatch) => {
    getData2(DisneySeriesLanguage).then((data) => {
      dispatch({
        type: disneyActionTypes.FETCH_DISNEY_SERIES_LANGUAGE,
        data,
      });
    });
  };
};

export const fetchDisneySeriesGenre = () => {
  return (dispatch) => {
    getData2(DisneySeriesGenre).then((data) => {
      dispatch({ type: disneyActionTypes.FETCH_DISNEY_SERIES_GENRE, data });
    });
  };
};
