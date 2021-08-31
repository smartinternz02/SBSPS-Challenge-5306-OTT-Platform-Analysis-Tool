//Importing Action types
import { recommenderActions } from "./recommenderActionTypes";

//Initial State
const initialState = {
  userPreferenceData: null,
  status: null,
};

//Creating reducer for updating redux state
const recommenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case recommenderActions.RECOMMENDER_PROCESSING:
      return {
        ...state,
        status: "loading",
      };
    case recommenderActions.RECOMMENDER_SUCCESS:
      return {
        ...state,
        userPreferenceData: action.data,
        status: "success",
      };
    case recommenderActions.RECOMMENDER_ERROR:
      return {
        ...state,
        userPreferenceData: null,
        status: null,
      };
    case recommenderActions.RECOMMENDER_RESET:
      return {
        ...state,
        userPreferenceData: null,
        status: null,
      };
    default:
      return state;
  }
};

export default recommenderReducer;
