//Importing action types for netflix data
import { netflixActionTypes } from "./netflixActionType";

//Importing Utility functions for fetching data
import { getData2, getData4 } from "../utils";

//Defining URLs
const NetflixMovieLanguage =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/Netflix/lang-movie-netflix.csv?token=AOKKBVFVYXLRKUTEK34ZT7DBGSPNG";
const NetflixMovieGenre =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/Netflix/genre-movie-netflix.csv?token=AOKKBVGLM4G6GKN3H2NMVF3BGSPPK";
const NetflixSeriesLanguage =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/Netflix/lang-series-netflix.csv?token=AOKKBVGQTCJ3KI665XV7XOLBGSPRI";
const NetflixSeriesGenre =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/Netflix/genre-series-netflix.csv?token=AOKKBVG57NV6WUNR2BMKKMDBGSPTS";
const NetflixMap =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/Netflix/netlix-map.csv?token=AOKKBVB5VZ2U4G46R2ERBC3BGSPVA";

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
