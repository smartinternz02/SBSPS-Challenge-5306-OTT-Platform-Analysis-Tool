//Imporitng Actions needed fot Authentication
import { authActionTypes } from "./authActionTypes";

//Action for logging in using email and password
export const loginAccount = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    //Calling firebase signInWithEmailAndPassword Function
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: authActionTypes.LOGIN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: authActionTypes.LOGIN_ERROR, err });
      });
  };
};

//Action for logging user out
export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    //Calling firebase signOut function
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: authActionTypes.SIGNOUT_SUCCESS });
      });
  };
};

//Action for signing Up a new user using email ans password
export const signUpNewUser = (newUser) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    //Calling firebase function for creating a new user
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updateProfile({
            displayName: newUser.name,
          })
          .then(() => {
            dispatch({ type: authActionTypes.SIGNUP_SUCESS });
          })
          .catch((err) => {
            dispatch({ type: authActionTypes.SIGNUP_ERROR, err });
          });
      })
      .catch((err) => {
        dispatch({ type: authActionTypes.SIGNUP_ERROR, err });
      });
  };
};

//Action for signing in using Google
export const signInWithGoogle = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    //Getting providers for google login
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    //Calling firebase function for login
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        dispatch({ type: authActionTypes.LOGIN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: authActionTypes.LOGIN_ERROR, err });
      });
  };
};
