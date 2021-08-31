// Importing Libraries and stylesheets
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.scss";

// Importing Pages
import AuthPage from "./pages/auth/auth.page";
import MainPage from "./pages/main/main.page";
import { ReactComponent as Error } from "./assets/error.svg";

// Component to be rendered in root ID of index.html
function App() {
  const auth = useSelector((state) => state.firebase.auth);
  const isAuth = auth.uid ? <MainPage /> : <AuthPage />;
  const [screensize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const screen =
    screensize > 1166 ? (
      isAuth
    ) : (
      <div className="mobile-screen-error">
        <div className="img">
          <Error />
        </div>
        <div className="text" style={{ padding: 7 }}>
          This app is made for larger screen. Please try with a larger screen
          Tab, Laptop or Desktop.
        </div>
      </div>
    );

  return (
    <div>
      <div className="App">{screen}</div>
    </div>
  );
}

export default App;
