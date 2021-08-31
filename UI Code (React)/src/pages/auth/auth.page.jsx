// Importing Libraries and stylesheets
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./auth.styles.scss";

// Importing Custom Hooks
import useInput from "../../hooks/use-input";

// Importing Actions
import {
  loginAccount,
  signUpNewUser,
  signInWithGoogle,
} from "../../redux/auth/authActions";

// Importing Icons and Images
import { ReactComponent as LogoBlack } from "../../assets/LOGO1.svg";
import { ReactComponent as LogoWhite } from "../../assets/LOGO1-white.svg";
import { ReactComponent as UserIcon } from "../../assets/user-circle.svg";
import { ReactComponent as EmailIcon } from "../../assets/email.svg";
import { ReactComponent as LockIcon } from "../../assets/lock.svg";
import { ReactComponent as GoogleIcon } from "../../assets/google-fill.svg";

// Importing Components
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";

// Form Validators
const emailValidator = (value) => value.includes("@");
const notEmptyValidator = (value) => value.trim() !== "";

// Component to conatin all auth content
const AuthPage = () => {
  // Node References
  let accentLayer = useRef(null);
  let switchToSignUp = useRef(null);
  let switchToSignIn = useRef(null);
  let blackLogo = useRef(null);
  let whiteLogo = useRef(null);
  let signIn = useRef(null);
  let signUp = useRef(null);
  let authContainer = useRef(null);

  // GSAP Timelines
  const tl = gsap.timeline();
  const tl1 = gsap.timeline();
  const tl2 = gsap.timeline();

  //Component Did Mount
  useEffect(() => {
    // Loading Animation
    gsap.to(authContainer, { duration: 0, css: { visibility: "visible" } });
    tl.from(accentLayer, { duration: 1, x: -546, ease: "power2.out" })
      .from(
        switchToSignUp,
        { duration: 0.8, opacity: 0, x: -360, ease: "power2.out" },
        "<0.3"
      )
      .from(
        signIn,
        { duration: 0.8, opacity: 0, x: -360, ease: "power2.out" },
        "<0.3"
      )
      .from(
        blackLogo,
        { duration: 0.4, opacity: 0, ease: "power2.out" },
        "<0.4"
      );
  }, []);

  // Animations

  const slideToSignUp = () => {
    emailReset();
    passwordReset();
    tl1
      .to(accentLayer, { duration: 1, x: -546, ease: "power2.out" })
      .to(blackLogo, { duration: 0.4, opacity: 0, ease: "power2.out" }, "<0.4")
      .to(whiteLogo, { duration: 0.4, opacity: 1, ease: "power2.out" }, "<0.1")
      .to(
        switchToSignUp,
        { duration: 0.8, opacity: 0, x: 100, ease: "power2.out" },
        "-=1.2"
      )
      .to(switchToSignUp, { duration: 0, css: { display: "none" } })
      .to(switchToSignUp, { duration: 0, x: 0 })
      .to(
        switchToSignIn,
        {
          duration: 0.8,
          css: { display: "block", opacity: 1 },
          ease: "power2.out",
        },
        "-=0.6"
      )
      .from(
        switchToSignIn,
        { duration: 0.8, x: 360, ease: "power2.out" },
        "-=1.0"
      )
      .to(signIn, { duration: 0, css: { visibility: "hidden", opacity: 0 } })
      .to(
        signUp,
        {
          duration: 1,
          css: { visibility: "visible", opacity: 1 },
          ease: "power2.out",
        },
        "-=0.8"
      )
      .from(signUp, { duration: 0.4, x: 100, ease: "power2.out" }, "-=1.0");
  };

  const slideToSignIn = () => {
    emailReset();
    nameReset();
    passwordReset();
    tl2
      .to(accentLayer, { duration: 1, x: 0, ease: "power2.out" })
      .to(whiteLogo, { duration: 0, opacity: 0, ease: "power2.out" }, "-=1.4")
      .to(blackLogo, { duration: 0.4, opacity: 1, ease: "power2.out" }, "<0.4")
      .to(
        switchToSignIn,
        { duration: 0.8, opacity: 0, x: -100, ease: "power2.out" },
        "-=1.2"
      )
      .to(switchToSignIn, { duration: 0, css: { display: "none" } })
      .to(switchToSignIn, { duration: 0, x: 0 })
      .to(
        switchToSignUp,
        {
          duration: 0.8,
          css: { display: "block", opacity: 1 },
          ease: "power2.out",
        },
        "-=0.6"
      )
      .from(
        switchToSignUp,
        { duration: 0.8, x: -100, ease: "power2.out" },
        "-=1.0"
      )
      .to(signUp, { duration: 0, css: { visibility: "hidden", opacity: 0 } })
      .to(
        signIn,
        {
          duration: 1,
          css: { visibility: "visible", opacity: 1 },
          ease: "power2.out",
        },
        "-=0.8"
      )
      .from(signIn, { duration: 0.4, x: -100, ease: "power2.out" }, "-=1.0");
  };

  // Dispatch and Selectors
  const dispatch = useDispatch();
  const history = useHistory();
  const loginError = useSelector((state) => state.auth.loginError);
  const signUpError = useSelector((state) => state.auth.signUpError);

  if (loginError === "OK" || signUpError === "OK") {
    history.push("/home");
  }

  // Form Handling
  const {
    value: emailValue,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    isValid: emailIsValid,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(emailValidator);

  const {
    value: passwordValue,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    isValid: passwordIsValid,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(notEmptyValidator);

  const {
    value: nameValue,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    isValid: nameIsValid,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(notEmptyValidator);

  let loginFormValid = false;
  if (emailIsValid && passwordIsValid) {
    loginFormValid = true;
  }

  let signUpFormValid = false;
  if (emailIsValid && passwordIsValid && nameIsValid) {
    signUpFormValid = true;
  }

  // Function to handle login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: emailValue,
      password: passwordValue,
    };
    dispatch(loginAccount(credentials));
    emailReset();
    passwordReset();
  };

  // Function to handle sign up submission
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: emailValue,
      password: passwordValue,
      name: nameValue,
    };
    dispatch(signUpNewUser(newUser));
    emailReset();
    passwordReset();
    nameReset();
  };

  // Function to Google Signup/Login submission
  const googleHandler = (e) => {
    e.preventDefault();
    dispatch(signInWithGoogle());
  };

  return (
    <div className="auth-page">
      {/* Chatbot overlay for hiding it in auth stage */}
      <div className="chatbot-hider"></div>
      <div className="auth-container" ref={(el) => (authContainer = el)}>
        {/* Sign In */}
        <div className="sign-in" ref={(el) => (signIn = el)}>
          <div className="title">Sign in</div>
          <form>
            <FormInput
              type="email"
              name="email"
              value={emailValue}
              haserror={emailHasError}
              errormessage={"Enter valid email address"}
              handleChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              placeholder="Email"
              Component={EmailIcon}
            />
            <FormInput
              type="password"
              name="password"
              value={passwordValue}
              haserror={passwordHasError}
              errormessage={"Enter a password"}
              handleChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              placeholder="Password"
              Component={LockIcon}
            />
          </form>
          <CustomButton disabled={!loginFormValid} onClick={handleLoginSubmit}>
            SIGN IN
          </CustomButton>
          <div className="sub-text">or use your Gmail account to sign in</div>
          <div className="google-signup" onClick={googleHandler}>
            <GoogleIcon />
          </div>
          <div>
            {loginError && loginError !== "OK" ? (
              <p
                style={{
                  fontSize: 12,
                  background: "#FF9494",
                  marginLeft: 20,
                  marginRight: 20,
                  padding: 10,
                  borderRadius: 10,
                  textAlign: "center",
                }}
              >
                {loginError}
              </p>
            ) : null}
          </div>
        </div>

        {/* Sign Up */}
        <div className="sign-up" ref={(el) => (signUp = el)}>
          <div className="title">Sign Up</div>
          <form>
            <FormInput
              type="text"
              name="name"
              value={nameValue}
              haserror={nameHasError}
              errormessage={"Please enter a name"}
              placeholder="Your Name"
              handleChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              Component={UserIcon}
            />
            <FormInput
              type="email"
              name="email"
              value={emailValue}
              haserror={emailHasError}
              errormessage={"Enter valid email address"}
              placeholder="Email"
              handleChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              Component={EmailIcon}
            />
            <FormInput
              type="password"
              name="password"
              value={passwordValue}
              haserror={passwordHasError}
              errormessage={"Enter a password"}
              placeholder="Password"
              handleChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              Component={LockIcon}
            />
          </form>
          <CustomButton
            disabled={!signUpFormValid}
            onClick={handleSignUpSubmit}
          >
            SIGN UP
          </CustomButton>
          <div className="sub-text">or use your Gmail account to sign up</div>
          <div className="google-signup" onClick={googleHandler}>
            <GoogleIcon />
          </div>
          <div>
            {signUpError && signUpError !== "OK" ? (
              <p
                style={{
                  fontSize: 12,
                  background: "#FF9494",
                  marginLeft: 20,
                  marginRight: 20,
                  padding: 10,
                  borderRadius: 10,
                  textAlign: "center",
                }}
              >
                {signUpError}
              </p>
            ) : null}
          </div>
        </div>

        {/* Logos */}
        <LogoWhite className="white-logo" ref={(el) => (whiteLogo = el)} />
        <LogoBlack className="black-logo" ref={(el) => (blackLogo = el)} />

        {/* Accent layer */}
        <div
          ref={(el) => (accentLayer = el)}
          className="accent-container"
        ></div>

        {/* Switch to Sign Up Section */}
        <div className="switch-to-sign-up" ref={(el) => (switchToSignUp = el)}>
          <div className="title">Hola, Amigo!</div>
          <div className="info">
            Find Your Binge is a webapp which will help you find an OTT platform
            which is perfect for you.
            <br />
            Enter your details and start your journey with us!!
          </div>
          <CustomButton onClick={slideToSignUp}>Sign Up</CustomButton>
        </div>

        {/* Switch to Sign In Section */}
        <div className="switch-to-sign-in" ref={(el) => (switchToSignIn = el)}>
          <div className="title">Welcome Back!</div>
          <div className="info-small">
            If your are an existing user, please login using your personal
            details...
          </div>
          <CustomButton onClick={slideToSignIn}>Sign In</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
