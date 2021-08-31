//Importing Libraries
import { createSelector } from "reselect";

const selectPrime = (state) => state.prime;

//Creating selectors for getting Prime Videos data from global redux state for the detailed anaylsis page
export const selectPrimeMovieGenre = createSelector(
  [selectPrime],
  (prime) => prime.movies_genre
);

export const selectPrimeSeriesGenre = createSelector(
  [selectPrime],
  (prime) => prime.series_genre
);

export const selectPrimeMovieLang = createSelector(
  [selectPrime],
  (prime) => prime.movies_language
);

export const selectPrimeSeriesLang = createSelector(
  [selectPrime],
  (prime) => prime.series_language
);
