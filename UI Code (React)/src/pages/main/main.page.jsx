// Importing Libraries and stylesheets
import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

// Importing Components
import TopBar from "../../components/top-bar/top-bar.component";
import SideBar from "../../components/side-bar/side-bar.component";
import HomeContent from "../../components/home-content/home-content.component";
import "./main.styles.scss";
import DashboardContent from "../../components/dashboard-content/dashboard-content.component";
import DetailedContent from "../../components/detailed-content/detailed-content.component";
import RecommenderContent from "../../components/recommender-content/recommender-content.component";
import WhatsHotContent from "../../components/whats-hot-content/whats-hot-content.component";

// Importing Actions
import {
  fetchMovieAgeRating,
  fetchMovieGenre,
  fetchMovieIMDBRating,
  fetchMovieLanguage,
  fetchSeriesAgeRating,
  fetchSeriesGenre,
  fetchSeriesIMDBRating,
  fetchSeriesLanguage,
  fetchMarketShare,
  fetchUserGrowth,
  fetchPrice,
} from "../../redux/data/dataActions";

// Component to contain the Main page content
const MainPage = () => {
  // Component Did Mount
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovieAgeRating());
    dispatch(fetchMovieGenre());
    dispatch(fetchMovieIMDBRating());
    dispatch(fetchMovieLanguage());
    dispatch(fetchSeriesAgeRating());
    dispatch(fetchSeriesGenre());
    dispatch(fetchSeriesIMDBRating());
    dispatch(fetchSeriesLanguage());
    dispatch(fetchUserGrowth());
    dispatch(fetchMarketShare());
    dispatch(fetchPrice());
  }, []);

  return (
    <div className="main-page">
      {/* Top bar */}
      <TopBar />

      {/* Navigation menu */}
      <SideBar />

      {/* Main Content */}
      <div className="main-content">
        <Switch>
          {/* Different Route Setups for different content */}
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/home" />;
            }}
          />

          <Route exact path="/home" component={HomeContent} />
          <Route exact path="/dashboard">
            <DashboardContent />
          </Route>
          <Route exact path="/recommender">
            <RecommenderContent />
          </Route>
          <Route exact path="/detailed">
            <DetailedContent />
          </Route>
          <Route exact path="/whatshot">
            <WhatsHotContent />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default MainPage;
