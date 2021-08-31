//Importing Action Types for Recommender
import { recommenderActions } from "./recommenderActionTypes";

//Action for Sending a POST Request with the User preferences to get OTT recommendations along with justified data
export const submitForm = (userPreference) => {
  return (dispatch, getState) => {
    dispatch({ type: recommenderActions.RECOMMENDER_PROCESSING });

    //Configuring body of POST request
    const data = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Accept-Charset": "UTF-8",
      },
      body: JSON.stringify(userPreference),
    };

    //Sending the POST request
    fetch("https://ott-recommender-app.eu-gb.mybluemix.net/", data)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: recommenderActions.RECOMMENDER_SUCCESS, data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: recommenderActions.RECOMMENDER_ERROR, err });
      });
  };
};

//Action to reset the recommender input form
export const resetRecommender = () => {
  return (dispatch) => {
    dispatch({ type: recommenderActions.RECOMMENDER_RESET });
  };
};
