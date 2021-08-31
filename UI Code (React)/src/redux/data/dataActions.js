//Importing Libraries
import { dataActionTypes } from "./dataActionType";

//Importing utility functions for fetching data
import getData, { getData3 } from "../utils";

//URLs for CSV data
const ageMovieAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/age-movies-all.csv?token=AOKKBVEVZGWDJMTQVQ2Y6I3BGSOKI";
const priceCompAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/price-comp-all.csv?token=AOKKBVHNOVUIKU3XWDM4L3LBGSOMA";
const langMoviesAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/lang-movies-all.csv?token=AOKKBVGI6HNQK4AENWAZVY3BGSONW";
const genreMoviesAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/genre-movie-all%20.csv?token=AOKKBVHULC32AVQTFCAKXB3BGSOPK";
const imdbMoviesAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/imdb-movies-all.csv?token=AOKKBVDC7X6KEQ3SJVRDOFTBGSORC";
const ageSeriesAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/age-series-all.csv?token=AOKKBVHFJZQJDAMQ2PASWB3BGSOSO";
const languageSeriesAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/lang-series-all.csv?token=AOKKBVEOKPYERFZBYFUANB3BGSOTW";
const genreSeriesAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/genre-series-all.csv?token=AOKKBVCYED7UL3RIJ7G42PTBGSQOA";
const imdbSeriesAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/imdb-series-all.csv?token=AOKKBVBTPIHAW4EML2JLZSDBGSOVK";
const userGrowthAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/user-growth-all.csv?token=AOKKBVARBPJ6CQQOUPIEJGTBGSOXE";
const marketShareAll =
  "https://raw.githubusercontent.com/akhiljayan29aj/FindYourBinge/main/src/assets/csv-data/market-share-all.csv?token=AOKKBVDRMDG6UFM6QUWOO4TBGSOYO";

//Creating actions for fetching dashboard data

//Action for fetching Age Rating Data for movies
export const fetchMovieAgeRating = () => {
  return (dispatch) => {
    getData(ageMovieAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_MOVIE_AGE_RATING, data });
    });
  };
};

//Action for fetching Price Data
export const fetchPrice = () => {
  return (dispatch) => {
    getData3(priceCompAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_PRICE, data });
    });
  };
};

//Action for fetching Language Data for movies
export const fetchMovieLanguage = () => {
  return (dispatch) => {
    getData(langMoviesAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_MOVIE_LANGUAGE, data });
    });
  };
};

//Action for fetching Genre data for movies
export const fetchMovieGenre = () => {
  return (dispatch) => {
    getData(genreMoviesAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_MOVIE_GENRE, data });
    });
  };
};

//Action for fetching IMDB Rating Data for movies
export const fetchMovieIMDBRating = () => {
  return (dispatch) => {
    getData(imdbMoviesAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_MOVIE_IMDB_RATING, data });
    });
  };
};

//Action for fetching Age Rating Data for series
export const fetchSeriesAgeRating = () => {
  return (dispatch) => {
    getData(ageSeriesAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_SERIES_AGE_RATING, data });
    });
  };
};

//Action for fetching language Data for series
export const fetchSeriesLanguage = () => {
  return (dispatch) => {
    getData(languageSeriesAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_SERIES_LANGUAGE, data });
    });
  };
};

//Action for fetching Genre Data for series
export const fetchSeriesGenre = () => {
  return (dispatch) => {
    getData(genreSeriesAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_SERIES_GENRE, data });
    });
  };
};

//Action for fetching IMDB Rating Data for series
export const fetchSeriesIMDBRating = () => {
  return (dispatch) => {
    getData(imdbSeriesAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_SERIES_IMDB_RATING, data });
    });
  };
};

//Action for fetching User Growth Data
export const fetchUserGrowth = () => {
  return (dispatch) => {
    getData(userGrowthAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_USER_GROWTH, data });
    });
  };
};

//Action for fetching Market Share Data
export const fetchMarketShare = () => {
  return (dispatch) => {
    getData(marketShareAll).then((data) => {
      dispatch({ type: dataActionTypes.FETCH_MARKET_SHARE, data });
    });
  };
};
