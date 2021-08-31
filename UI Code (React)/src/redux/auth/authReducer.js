//Importing ActionTypes for Authentication
import { authActionTypes } from "./authActionTypes";

//Initial State
const initialState = {
  loginError: null,
  signUpError: null,
};

//Reducers for Authentication
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN_ERROR:
      return {
        ...state,
        loginError: action.err.message,
      };
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginError: "OK",
      };
    case authActionTypes.SIGNOUT_SUCCESS:
      return state;
    case authActionTypes.SIGNUP_SUCESS:
      return {
        ...state,
        signUpError: "OK",
      };
    case authActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        signUpError: action.err.message,
      };
    default:
      return state;
  }
};

export default authReducer;
