//Importing Libraries
import { createSelector } from "reselect";

const selectDisney = (state) => state.disney;

//Creating selectors for getting Disney+Hotstar data from global redux state for the detailed anaylsis page
export const selectDisneyMovieGenre = createSelector(
  [selectDisney],
  (disney) => disney.movies_genre
);

export const selectDisneySeriesGenre = createSelector(
  [selectDisney],
  (disney) => disney.series_genre
);

export const selectDisneyMovieLang = createSelector(
  [selectDisney],
  (disney) => disney.movies_language
);

export const selectDisneySeriesLang = createSelector(
  [selectDisney],
  (disney) => disney.series_language
);
