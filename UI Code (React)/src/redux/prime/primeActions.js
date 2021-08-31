//Importing action types for prime videos data
import { primeActionTypes } from "./primeActionType";

//Importing Utility functions for fetching data
import { getData2 } from "../utils";

//Defining URLs
const PrimeMovieLanguage =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Prime/lang-movie-prime.csv";
const PrimeMovieGenre =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Prime/genre-movie-prime.csv";
const PrimeSeriesLanguage =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Prime/lang-series-prime.csv";
const PrimeSeriesGenre =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Prime/genre-series-prime.csv";

//Creating Actions for fetching Prime Video Data for the detailed Prime Videos Analyis Section
export const fetchPrimeMovieLanguage = () => {
  return (dispatch) => {
    getData2(PrimeMovieLanguage).then((data) => {
      dispatch({ type: primeActionTypes.FETCH_PRIME_MOVIE_LANGUAGE, data });
    });
  };
};

export const fetchPrimeMovieGenre = () => {
  return (dispatch) => {
    getData2(PrimeMovieGenre).then((data) => {
      dispatch({ type: primeActionTypes.FETCH_PRIME_MOVIE_GENRE, data });
    });
  };
};

export const fetchPrimeSeriesLanguage = () => {
  return (dispatch) => {
    getData2(PrimeSeriesLanguage).then((data) => {
      dispatch({
        type: primeActionTypes.FETCH_PRIME_SERIES_LANGUAGE,
        data,
      });
    });
  };
};

export const fetchPrimeSeriesGenre = () => {
  return (dispatch) => {
    getData2(PrimeSeriesGenre).then((data) => {
      dispatch({ type: primeActionTypes.FETCH_PRIME_SERIES_GENRE, data });
    });
  };
};
