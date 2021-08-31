// Importing Libraries and stylesheets
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./recommender-content.styles.scss";

// Importing Icons and Images
import { ReactComponent as SittingGirl } from "../../assets/girl-sitting.svg";

// Importing Components
import CustomCheckbox from "../custom-checkbox/custom-checkbox.component";
import Loader from "../loader/loader.component";

// Importing Options for the quiz
import {
  ageRating,
  preference,
  imbdRating,
  languageOptions,
  genreOptions,
} from "../../assets/recommender.options";

// Importing Custom Hook
import useInput from "../../hooks/use-input";

// Importing Actions
import {
  submitForm,
  resetRecommender,
} from "../../redux/recommender/recommenderActions";

// Component to contain the Recommender content
const RecommenderContent = () => {
  // Component Did Mount
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const dispatch = useDispatch();

  // Pulling params from redux store
  const responseData = useSelector(
    (state) => state.recommender.userPreferenceData
  );
  const status = useSelector((state) => state.recommender.status);

  // Using the custom hook to manage the state
  const {
    value: movieOrSeries,
    valueChangeHandler: movieOrSeriesChangeHandler,
    reset: movieOrSeriesReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: age_rating,
    valueChangeHandler: age_ratingChangeHandler,
    reset: age_ratingReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: imdb_rating,
    valueChangeHandler: imdbHandler,
    reset: imdbReset,
  } = useInput((value) => value.trim() !== "");

  // States to manage the user's selection
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [impactFactor, setImpactFactor] = useState([1, 1, 1, 1, 1]);
  const disabled =
    languages.length === 0 &&
    genres.length === 0 &&
    imdb_rating === "" &&
    age_rating === "" &&
    movieOrSeries === "";

  // Functions to handle change in options
  const languageChangeHandler = (event) => {
    const updatedLanguages = updateChange(event.target.value, languages);
    setLanguages(updatedLanguages);
  };

  const genreChangeHandler = (event) => {
    const updatedGenres = updateChange(event.target.value, genres);
    setGenres(updatedGenres);
  };

  const updateChange = (value, current) => {
    let updatedValue;
    let isPresent = current.includes(value);
    if (isPresent) {
      updatedValue = current.filter((lang) => lang !== value);
    } else {
      updatedValue = [...current, value];
    }

    return updatedValue;
  };

  const impactHandler = (event) => {
    const updatedImpactFactor = [...impactFactor];
    updatedImpactFactor[event.target.id] =
      updatedImpactFactor[event.target.id] === 1 ? 2 : 1;
    setImpactFactor(updatedImpactFactor);
  };

  // Function to handle the submission of form
  const formHandler = () => {
    if (movieOrSeries) {
      const userData = {
        m_or_tv: movieOrSeries,
        age: age_rating ? [age_rating] : ["None"],
        imdb: imdb_rating ? [imdb_rating] : ["None"],
        genre: genres.length !== 0 ? genres : ["None"],
        language: languages.length !== 0 ? languages : ["None"],
        impact_factor: impactFactor,
      };
      dispatch(submitForm(userData));
      setGenres([]);
      setLanguages([]);
      movieOrSeriesReset();
      age_ratingReset();
      imdbReset();
      setImpactFactor([1, 1, 1, 1, 1]);
    } else {
      alert(
        "Choose among Movies, Series or Both in What do you prefer to watch section"
      );
    }
  };

  // Function to handle the reset of selected values
  const resetFormHandler = () => {
    [...document.querySelectorAll(".custom-check-box")].map(
      (el) => (el.checked = false)
    );
    setGenres([]);
    setLanguages([]);
    movieOrSeriesReset();
    age_ratingReset();
    imdbReset();
    setImpactFactor([1, 1, 1, 1, 1]);
  };

  // Function to handle reset of the quiz
  const resetHandler = () => {
    dispatch(resetRecommender());
  };

  // Function to create options for charts according to the input values
  const optionMaker = (el) => {
    return {
      chart: {
        type: "column",
        height: 160,
        width: 350,
        backgroundColor: "#15181c",
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        valueSuffix: "%",
      },
      legend: {
        enabled: false,
      },
      title: {
        text: "",
      },
      subtitle: {
        text: "",
      },
      xAxis: {
        categories: ["Netflix", "Prime Video", "Disney+ Hotstar"],
        crosshair: true,
      },
      yAxis: {
        labels: {
          enabled: false,
        },
        min: 0,
        title: {
          text: "",
        },
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
        },
      },
      series: [
        {
          name: String(el.param).toUpperCase(),
          colorByPoint: true,
          data: [
            Number(parseFloat(el.data[0]).toFixed(2)),

            Number(parseFloat(el.data[1]).toFixed(2)),
            Number(parseFloat(el.data[2]).toFixed(2)),
          ],
        },
      ],
    };
  };

  return (
    <div className="recommender">
      {/* Intro */}
      <div className="intro">
        <SittingGirl className="image" />
        <div>
          <div className="title">Let’s Find Your Binge Together!!</div>
          <div className="text">
            Here you can find an OTT that best suits your preferences. You can
            take this simple quiz below to find the OTT of your dreams.
          </div>
        </div>
      </div>
      {!status && (
        // Quiz
        <div className="quiz">
          <div className="title">
            Select the options you would like in your OTT below..
          </div>
          <div
            className="reset-form"
            title="Reset Options"
            onClick={resetFormHandler}
          >
            <img
              src="https://img.icons8.com/ios-filled/50/000000/recurring-appointment.png"
              alt=""
            />
          </div>
          <div className="options">
            <div className="grid1">
              {/* Movies or Series */}
              <div className="preference">
                <div className="text">What do you prefer to watch ?</div>
                <div className="priority">
                  <span className="subtext">Set High Priority</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    onClick={impactHandler}
                    id={0}
                  ></input>
                </div>
                <div className="flex" onChange={movieOrSeriesChangeHandler}>
                  {preference.map((prefer) => {
                    return (
                      <CustomCheckbox
                        key={prefer.displayName}
                        name="preferences"
                        imglink={prefer.imglink}
                        displayName={prefer.displayName}
                        value={prefer.value}
                        type={prefer.type}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Age Rating Preference */}
              <div className="age-rating">
                <div className="text">
                  Content of which age rating would you prefer ?
                </div>
                <div className="priority">
                  <span className="subtext">Set High Priority</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    onClick={impactHandler}
                    id={1}
                  ></input>
                </div>
                <div className="flex" onChange={age_ratingChangeHandler}>
                  {ageRating.map((age) => {
                    return (
                      <CustomCheckbox
                        key={age.displayName}
                        name="age-rating"
                        displayName={age.displayName}
                        imglink={age.imglink}
                        value={age.value}
                        type={age.type}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Genre Preference */}
              <div className="genre">
                <div className="text">What genres do you like to watch?</div>
                <div className="priority">
                  <span className="subtext">Set High Priority</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    onClick={impactHandler}
                    id={3}
                  ></input>
                </div>
                <div className="flex" onChange={genreChangeHandler}>
                  {genreOptions.map((genre) => {
                    return (
                      <CustomCheckbox
                        key={genre.displayName}
                        name={genre.displayName}
                        displayName={genre.displayName}
                        imglink={genre.imglink}
                        value={genre.value}
                        type={genre.type}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Language Preference */}
              <div className="languages">
                <div className="text">What languages do you watch ?</div>
                <div className="priority">
                  <span className="subtext">Set High Priority</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    onClick={impactHandler}
                    id={4}
                  ></input>
                </div>
                <div className="flex" onChange={languageChangeHandler}>
                  {languageOptions.map((lang) => {
                    return (
                      <CustomCheckbox
                        key={lang.displayName}
                        name={lang.displayName}
                        displayName={lang.displayName}
                        imglink={lang.imglink}
                        value={lang.value}
                        type={lang.type}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* IMDB Rating Preference */}
            <div className="score">
              <div className="text">
                Content of what IMDB Rating do you like to watch ?
              </div>
              <div className="priority">
                <span className="subtext">Set High Priority</span>
                <input
                  type="checkbox"
                  className="toggle"
                  onClick={impactHandler}
                  id={2}
                ></input>
              </div>
              <div className="flex" onChange={imdbHandler}>
                {imbdRating.map((imbd) => {
                  return (
                    <CustomCheckbox
                      key={imbd.displayName}
                      name="imbd-rating"
                      displayName={imbd.displayName}
                      imglink={imbd.imglink}
                      value={imbd.value}
                      type={imbd.type}
                    />
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="btn-container">
              <button
                className="submit-button"
                disabled={disabled}
                onClick={formHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {status === "loading" && <Loader />}
      {status === "success" && (
        // Results
        <div className="results">
          {/* Winner Announcement */}
          <div className="winner">
            <div className="announcement">
              <div className="title">Test results are in!!</div>
              <div className="grid-results">
                <div className="subtitle">
                  According to our algorithm, the best suited OTT platform for
                  you is:
                </div>
                <div className="imgs">
                  {responseData.winner.includes("Netflix") ? (
                    <img
                      src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                      alt=""
                      title="Netflix"
                    />
                  ) : null}
                  {responseData.winner.includes("Prime") ? (
                    <img
                      src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                      alt=""
                      title="Prime Videos"
                    />
                  ) : null}
                  {responseData.winner.includes("Disney") ? (
                    <img
                      src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                      alt=""
                      title="Disney+ Hotstar"
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="btn-container">
              <button className="submit-button" onClick={resetHandler}>
                Take the test again
              </button>
            </div>
          </div>

          {/* Indepth Analysis of Movies */}
          {responseData.detail_analysis.movie ? (
            <details>
              <summary className="title">In-Depth Movies Analysis</summary>
              {responseData.detail_analysis.movie.m_or_tv ? (
                <details className="category">
                  <summary className="subtitle">Total number of Movies</summary>
                  <div className="header">
                    <div className="range-h">Parameter</div>
                    <div className="net-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                        alt=""
                      />
                    </div>
                    <div className="prime-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                        alt=""
                      />
                    </div>
                    <div className="dis-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                        alt=""
                      />
                    </div>
                    <div className="graph">Comparison</div>
                  </div>
                  {responseData.detail_analysis.movie.m_or_tv.map((el) => {
                    el.param = "Movies";
                    return (
                      <div className="row" key={el.param}>
                        <div className="range-h">
                          {String(el.param).toUpperCase()}
                        </div>
                        <div className="net-h">
                          {parseFloat(el.data[0]).toFixed(2)}%
                        </div>
                        <div className="prime-h">
                          {parseFloat(el.data[1]).toFixed(2)}%
                        </div>
                        <div className="dis-h">
                          {parseFloat(el.data[2]).toFixed(2)}%
                        </div>
                        <div className="graph">
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={optionMaker(el)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </details>
              ) : null}

              {responseData.detail_analysis.movie.language ? (
                <details className="category">
                  <summary className="subtitle">Language Distribution</summary>
                  <div className="header">
                    <div className="range-h">Parameter</div>
                    <div className="net-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                        alt=""
                      />
                    </div>
                    <div className="prime-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                        alt=""
                      />
                    </div>
                    <div className="dis-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                        alt=""
                      />
                    </div>
                    <div className="graph">Comparison</div>
                  </div>
                  {responseData.detail_analysis.movie.language.map((el) => (
                    <div className="row" key={el.param}>
                      <div className="range-h">
                        {String(el.param).toUpperCase()}
                      </div>
                      <div className="net-h">
                        {parseFloat(el.data[0]).toFixed(2)}%
                      </div>
                      <div className="prime-h">
                        {parseFloat(el.data[1]).toFixed(2)}%
                      </div>
                      <div className="dis-h">
                        {parseFloat(el.data[2]).toFixed(2)}%
                      </div>
                      <div className="graph">
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={optionMaker(el)}
                        />
                      </div>
                    </div>
                  ))}
                </details>
              ) : null}

              {responseData.detail_analysis.movie.genre ? (
                <details className="category">
                  <summary className="subtitle">Genre Distribution</summary>
                  <div className="header">
                    <div className="range-h">Parameter</div>
                    <div className="net-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                        alt=""
                      />
                    </div>
                    <div className="prime-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                        alt=""
                      />
                    </div>
                    <div className="dis-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                        alt=""
                      />
                    </div>
                    <div className="graph">Comparison</div>
                  </div>
                  {responseData.detail_analysis.movie.genre.map((el) => (
                    <div className="row" key={el.param}>
                      <div className="range-h">
                        {String(el.param).toUpperCase()}
                      </div>
                      <div className="net-h">
                        {parseFloat(el.data[0]).toFixed(2)}%
                      </div>
                      <div className="prime-h">
                        {parseFloat(el.data[1]).toFixed(2)}%
                      </div>
                      <div className="dis-h">
                        {parseFloat(el.data[2]).toFixed(2)}%
                      </div>
                      <div className="graph">
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={optionMaker(el)}
                        />
                      </div>
                    </div>
                  ))}
                </details>
              ) : null}

              {responseData.detail_analysis.movie.age ? (
                <details className="category">
                  <summary className="subtitle">
                    Age Rating Distribution
                  </summary>
                  <div className="header">
                    <div className="range-h">Parameter</div>
                    <div className="net-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                        alt=""
                      />
                    </div>
                    <div className="prime-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                        alt=""
                      />
                    </div>
                    <div className="dis-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                        alt=""
                      />
                    </div>
                    <div className="graph">Comparison</div>
                  </div>
                  {responseData.detail_analysis.movie.age.map((el) => (
                    <div className="row" key={el.param}>
                      <div className="range-h">
                        {String(el.param).toUpperCase()}
                      </div>
                      <div className="net-h">
                        {parseFloat(el.data[0]).toFixed(2)}%
                      </div>
                      <div className="prime-h">
                        {parseFloat(el.data[1]).toFixed(2)}%
                      </div>
                      <div className="dis-h">
                        {parseFloat(el.data[2]).toFixed(2)}%
                      </div>
                      <div className="graph">
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={optionMaker(el)}
                        />
                      </div>
                    </div>
                  ))}
                </details>
              ) : null}

              {responseData.detail_analysis.movie.imdb ? (
                <details className="category">
                  <summary className="subtitle">
                    IMDB Rating Distribution
                  </summary>
                  <div className="header">
                    <div className="range-h">Parameter</div>
                    <div className="net-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                        alt=""
                      />
                    </div>
                    <div className="prime-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                        alt=""
                      />
                    </div>
                    <div className="dis-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                        alt=""
                      />
                    </div>
                    <div className="graph">Comparison</div>
                  </div>
                  {responseData.detail_analysis.movie.imdb.map((el) => (
                    <div className="row" key={el.param}>
                      <div className="range-h">
                        {String(el.param).toUpperCase()}
                      </div>
                      <div className="net-h">
                        {parseFloat(el.data[0]).toFixed(2)}%
                      </div>
                      <div className="prime-h">
                        {parseFloat(el.data[1]).toFixed(2)}%
                      </div>
                      <div className="dis-h">
                        {parseFloat(el.data[2]).toFixed(2)}%
                      </div>
                      <div className="graph">
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={optionMaker(el)}
                        />
                      </div>
                    </div>
                  ))}
                </details>
              ) : null}
            </details>
          ) : null}

          {/* Indepth Analysis of Series */}
          {responseData.detail_analysis.series ? (
            <details>
              <summary className="title">In-Depth Series Analysis</summary>
              {responseData.detail_analysis.series.m_or_tv ? (
                <details className="category">
                  <summary className="subtitle">Total number of Series</summary>
                  <div className="header">
                    <div className="range-h">Parameter</div>
                    <div className="net-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                        alt=""
                      />
                    </div>
                    <div className="prime-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                        alt=""
                      />
                    </div>
                    <div className="dis-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                        alt=""
                      />
                    </div>
                    <div className="graph">Comparison</div>
                  </div>
                  {responseData.detail_analysis.series.m_or_tv.map((el) => {
                    el.param = "Series";
                    return (
                      <div className="row" key={el.param}>
                        <div className="range-h">
                          {String(el.param).toUpperCase()}
                        </div>
                        <div className="net-h">
                          {parseFloat(el.data[0]).toFixed(2)}%
                        </div>
                        <div className="prime-h">
                          {parseFloat(el.data[1]).toFixed(2)}%
                        </div>
                        <div className="dis-h">
                          {parseFloat(el.data[2]).toFixed(2)}%
                        </div>
                        <div className="graph">
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={optionMaker(el)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </details>
              ) : null}

              {responseData.detail_analysis.series.langauge ? (
                <details className="category">
                  <summary className="subtitle">Language Distribution</summary>
                  <div className="header">
                    <div className="range-h">Parameter</div>
                    <div className="net-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                        alt=""
                      />
                    </div>
                    <div className="prime-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                        alt=""
                      />
                    </div>
                    <div className="dis-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                        alt=""
                      />
                    </div>
                    <div className="graph">Comparison</div>
                  </div>
                  {responseData.detail_analysis.series.langauge.map((el) => (
                    <div className="row" key={el.param}>
                      <div className="range-h">
                        {String(el.param).toUpperCase()}
                      </div>
                      <div className="net-h">
                        {parseFloat(el.data[0]).toFixed(2)}%
                      </div>
                      <div className="prime-h">
                        {parseFloat(el.data[1]).toFixed(2)}%
                      </div>
                      <div className="dis-h">
                        {parseFloat(el.data[2]).toFixed(2)}%
                      </div>
                      <div className="graph">
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={optionMaker(el)}
                        />
                      </div>
                    </div>
                  ))}
                </details>
              ) : null}

              {responseData.detail_analysis.series.genre ? (
                <details className="category">
                  <summary className="subtitle">Genre Distribution</summary>
                  <div className="header">
                    <div className="range-h">Parameter</div>
                    <div className="net-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                        alt=""
                      />
                    </div>
                    <div className="prime-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                        alt=""
                      />
                    </div>
                    <div className="dis-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                        alt=""
                      />
                    </div>
                    <div className="graph">Comparison</div>
                  </div>
                  {responseData.detail_analysis.series.genre.map((el) => (
                    <div className="row" key={el.param}>
                      <div className="range-h">
                        {String(el.param).toUpperCase()}
                      </div>
                      <div className="net-h">
                        {parseFloat(el.data[0]).toFixed(2)}%
                      </div>
                      <div className="prime-h">
                        {parseFloat(el.data[1]).toFixed(2)}%
                      </div>
                      <div className="dis-h">
                        {parseFloat(el.data[2]).toFixed(2)}%
                      </div>
                      <div className="graph">
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={optionMaker(el)}
                        />
                      </div>
                    </div>
                  ))}
                </details>
              ) : null}

              {responseData.detail_analysis.series.age ? (
                <details className="category">
                  <summary className="subtitle">
                    Age Rating Distribution
                  </summary>
                  <div className="header">
                    <div className="range-h">Parameter</div>
                    <div className="net-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                        alt=""
                      />
                    </div>
                    <div className="prime-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                        alt=""
                      />
                    </div>
                    <div className="dis-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                        alt=""
                      />
                    </div>
                    <div className="graph">Comparison</div>
                  </div>
                  {responseData.detail_analysis.series.age.map((el) => {
                    return (
                      <div className="row" key={el.param}>
                        <div className="range-h">
                          {String(el.param).toUpperCase()}
                        </div>
                        <div className="net-h">
                          {parseFloat(el.data[0]).toFixed(2)}%
                        </div>
                        <div className="prime-h">
                          {parseFloat(el.data[1]).toFixed(2)}%
                        </div>
                        <div className="dis-h">
                          {parseFloat(el.data[2]).toFixed(2)}%
                        </div>
                        <div className="graph">
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={optionMaker(el)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </details>
              ) : null}

              {responseData.detail_analysis.series.imdb ? (
                <details className="category">
                  <summary className="subtitle">
                    IMDB Rating Distribution
                  </summary>
                  <div className="header">
                    <div className="range-h">Parameter</div>
                    <div className="net-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/netflix-desktop-app.png"
                        alt=""
                      />
                    </div>
                    <div className="prime-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/amazon-prime-video.png"
                        alt=""
                      />
                    </div>
                    <div className="dis-h">
                      <img
                        src="https://img.icons8.com/plasticine/100/000000/disney-plus.png"
                        alt=""
                      />
                    </div>
                    <div className="graph">Comparison</div>
                  </div>
                  {responseData.detail_analysis.series.imdb.map((el) => (
                    <div className="row" key={el.param}>
                      <div className="range-h">
                        {String(el.param).toUpperCase()}
                      </div>
                      <div className="net-h">
                        {parseFloat(el.data[0]).toFixed(2)}%
                      </div>
                      <div className="prime-h">
                        {parseFloat(el.data[1]).toFixed(2)}%
                      </div>
                      <div className="dis-h">
                        {parseFloat(el.data[2]).toFixed(2)}%
                      </div>
                      <div className="graph">
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={optionMaker(el)}
                        />
                      </div>
                    </div>
                  ))}
                </details>
              ) : null}
            </details>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default RecommenderContent;
