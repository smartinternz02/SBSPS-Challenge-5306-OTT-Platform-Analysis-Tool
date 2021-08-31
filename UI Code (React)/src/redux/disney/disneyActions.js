//Importing action types for disney+hotstar data
import { disneyActionTypes } from "./disneyActionType";

//Importing Utility functions for fetching data
import { getData2 } from "../utils";

//Defining URLs
const DisneyMovieLanguage =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Disney/lang-movie-disney.csv";
const DisneyMovieGenre =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Disney/genre-movie-disney.csv";
const DisneySeriesLanguage =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Disney/lang-series-disney.csv";
const DisneySeriesGenre =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Disney/genre-series-disney.csv";

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
