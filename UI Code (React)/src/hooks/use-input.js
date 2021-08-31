// Importing Libraries
import { useState } from "react";

// A custom hook to set, validate and reset input
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  //Validating input
  const valueIsValid = validateValue(enteredValue);
  let hasError;
  if (!valueIsValid && isTouched) {
    hasError = "true";
  } else {
    hasError = null;
  }

  //Setting input values
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  //Reset input values
  const reset = () => {
    setIsTouched(false);
    setEnteredValue("");
  };

  return {
    value: enteredValue,
    hasError,
    valueChangeHandler,
    isValid: valueIsValid,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
