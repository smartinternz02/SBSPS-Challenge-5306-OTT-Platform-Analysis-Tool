//Importing Libraries
import { createSelector } from "reselect";

const selectNetflix = (state) => state.netflix;

//Creating selectors for getting Netflix data from global redux state for the detailed anaylsis page
export const selectNetflixMovieGenre = createSelector(
  [selectNetflix],
  (netflix) => netflix.movies_genre
);

export const selectNetflixSeriesGenre = createSelector(
  [selectNetflix],
  (netflix) => netflix.series_genre
);

export const selectNetflixMovieLang = createSelector(
  [selectNetflix],
  (netflix) => netflix.movies_language
);

export const selectNetflixSeriesLang = createSelector(
  [selectNetflix],
  (netflix) => netflix.series_language
);

export const selectNetflixMap = createSelector(
  [selectNetflix],
  (netflix) => netflix.map_data
);
