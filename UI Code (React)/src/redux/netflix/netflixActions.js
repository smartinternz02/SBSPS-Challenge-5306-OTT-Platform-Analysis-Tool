//Importing action types for netflix data
import { netflixActionTypes } from "./netflixActionType";

//Importing Utility functions for fetching data
import { getData2, getData4 } from "../utils";

//Defining URLs
const NetflixMovieLanguage =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Netflix/lang-movie-netflix.csv";
const NetflixMovieGenre =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Netflix/genre-movie-netflix.csv";
const NetflixSeriesLanguage =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Netflix/lang-series-netflix.csv";
const NetflixSeriesGenre =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Netflix/genre-series-netflix.csv";
const NetflixMap =
  "https://raw.githubusercontent.com/smartinternz02/SBSPS-Challenge-5306-OTT-Platform-Analysis-Tool/main/UI%20Code%20(React)/src/assets/csv-data/Netflix/netlix-map.csv";

//Creating Actions for fetching Netflix Data for the detailed Netflix Analyis Section
export const fetchNetflixMovieLanguage = () => {
  return (dispatch) => {
    getData2(NetflixMovieLanguage).then((data) => {
      dispatch({ type: netflixActionTypes.FETCH_NETFLIX_MOVIE_LANGUAGE, data });
    });
  };
};

export const fetchNetflixMap = () => {
  return (dispatch) => {
    getData4(NetflixMap).then((data) => {
      dispatch({ type: netflixActionTypes.FETCH_NETFLIX_MAP, data });
    });
  };
};

export const fetchNetflixMovieGenre = () => {
  return (dispatch) => {
    getData2(NetflixMovieGenre).then((data) => {
      dispatch({ type: netflixActionTypes.FETCH_NETFLIX_MOVIE_GENRE, data });
    });
  };
};

export const fetchNetflixSeriesLanguage = () => {
  return (dispatch) => {
    getData2(NetflixSeriesLanguage).then((data) => {
      dispatch({
        type: netflixActionTypes.FETCH_NETFLIX_SERIES_LANGUAGE,
        data,
      });
    });
  };
};

export const fetchNetflixSeriesGenre = () => {
  return (dispatch) => {
    getData2(NetflixSeriesGenre).then((data) => {
      dispatch({ type: netflixActionTypes.FETCH_NETFLIX_SERIES_GENRE, data });
    });
  };
};
