// Importing Libraries
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";
import firebase from "./../firebase/firebase";
import logger from "redux-logger";

// Middlewares
const middlewares = [thunk.withExtraArgument({ getFirebase })];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

// Creating Redux Global Store
export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, { attachAuthIsReady: true }) // redux binding for firebase
  )
);
