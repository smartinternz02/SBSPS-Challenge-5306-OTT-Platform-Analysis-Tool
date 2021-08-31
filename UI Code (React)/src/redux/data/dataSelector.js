//Importing Libraries
import { createSelector } from "reselect";

const selectData = (state) => state.data;

//Creating Selectors for grabbing CSV data from the global redux store
export const selectMovieAgeRating = createSelector(
  [selectData],
  (data) => data.movies_age_rating
);

export const selectSeriesAgeRating = createSelector(
  [selectData],
  (data) => data.series_age_rating
);

export const selectPrice = createSelector([selectData], (data) => data.price);

export const selectMovieGenre = createSelector(
  [selectData],
  (data) => data.movies_genre
);

export const selectSeriesGenre = createSelector(
  [selectData],
  (data) => data.series_genre
);

export const selectMovieIMDB = createSelector(
  [selectData],
  (data) => data.movies_imdb_rating
);

export const selectSeriesIMDB = createSelector(
  [selectData],
  (data) => data.series_imdb_rating
);

export const selectMovieLang = createSelector(
  [selectData],
  (data) => data.movies_language
);

export const selectSeriesLang = createSelector(
  [selectData],
  (data) => data.series_language
);

export const selectMarketShare = createSelector(
  [selectData],
  (data) => data.market_share
);
export const selectUserGrowth = createSelector(
  [selectData],
  (data) => data.user_growth
);
