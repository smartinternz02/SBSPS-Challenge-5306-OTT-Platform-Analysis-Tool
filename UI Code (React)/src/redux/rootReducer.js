// Importing Libraries
import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import { firebaseReducer } from "react-redux-firebase";
import recommenderReducer from "./recommender/recommenderReducer";
import dataReducer from "./data/dataReducer";
import netflixReducer from "./netflix/netflixReducer";
import primeReducer from "./prime/primeReducer";
import disneyReducer from "./disney/disneyReducer";

// Combining all reducers into root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  recommender: recommenderReducer,
  data: dataReducer,
  netflix: netflixReducer,
  prime: primeReducer,
  disney: disneyReducer,
});

export default rootReducer;
