// Importing Libraries and stylesheets
import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./dashboard-content.styles.scss";

// Importing Icons and Images
import { ReactComponent as ManImg } from "../../assets/man.svg";
import InsightIcon from "../../assets/investigation.png";

// Importing Components
import Loader from "../loader/loader.component";

// Importing utility funtions
import {
  pieColors,
  dataSeperator3,
  dataSeperator2,
  dataSeperator,
  sleep,
} from "../utils";

// Importing selectors
import {
  selectMarketShare,
  selectMovieAgeRating,
  selectMovieGenre,
  selectMovieIMDB,
  selectMovieLang,
  selectSeriesAgeRating,
  selectSeriesGenre,
  selectSeriesIMDB,
  selectSeriesLang,
  selectUserGrowth,
  selectPrice,
} from "../../redux/data/dataSelector";

// Importing Highcharts additional modules
const threeD = require("highcharts/highcharts-3d");
threeD(Highcharts);
const bubble = require("highcharts/highcharts-more");
bubble(Highcharts);
const anno = require("highcharts/modules/annotations");
anno(Highcharts);

// Setting global theme of charts
Highcharts.setOptions({
  colors: ["#FF4B61", "#009BEC", "#634ab0"],
  chart: {
    backgroundColor: "#15181c",
  },
  title: {
    style: {
      color: "#fff",
    },
  },
  xAxis: {
    gridLineColor: "#7b7b7b",
    gridLineWidth: 1,
  },
  yAxis: {
    gridLineColor: "#7b7b7b",
  },
  legend: {
    itemStyle: {
      color: "#ffffff",
    },
  },
});

// Component to contain the Dashboard content
const DashboardContent = (state) => {
  // State for loading till data is retrieved
  const [isLoading, setIsLoading] = useState(true);

  // States for changing visualisations
  const [vis, setvis] = useState(false);
  const [vis2, setvis2] = useState(false);

  // Function to introduce delay in a sub routine
  const wait = async (ms) => {
    await sleep(ms);
    setIsLoading(false);
  };

  // Component Did Mount
  useEffect(() => {
    wait(3000);
  }, []);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  // Destructing the state for values
  const {
    movies_age_rating,
    series_age_rating,
    movies_genre,
    series_genre,
    movies_imdb_rating,
    series_imdb_rating,
    movies_language,
    series_language,
    market_share,
    user_growth,
    price,
  } = state;

  // Highcharts Option objects for different graphs
  const netflixMovieAgePie = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      width: 355,
    },
    title: {
      text: "Netflix",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: pieColors(
          Highcharts,
          "#FF4B61",
          movies_age_rating.information.length
        ),
        dataLabels: {
          enabled: true,
          color: "#ffffff",
        },
      },
    },
    series: [
      {
        name: "Age Rating",
        data: dataSeperator(
          movies_age_rating.information,
          movies_age_rating.netflix_data
        ),
      },
    ],
  };

  const primeMovieAgePie = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      width: 335,
    },
    title: {
      text: "Prime Video",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: pieColors(
          Highcharts,
          "#009BEC",
          movies_age_rating.information.length
        ),
        dataLabels: {
          enabled: true,
          color: "#ffffff",
        },
      },
    },
    series: [
      {
        name: "Age Rating",
        data: dataSeperator(
          movies_age_rating.information,
          movies_age_rating.prime_data
        ),
      },
    ],
  };

  const disneyMovieAgePie = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      width: 320,
    },
    title: {
      text: "Disney+ Hotstar",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: pieColors(
          Highcharts,
          "#634ab0",
          movies_age_rating.information.length
        ),
        dataLabels: {
          enabled: true,
          color: "#ffffff",
        },
      },
    },
    series: [
      {
        name: "Age Rating",
        data: dataSeperator(
          movies_age_rating.information,
          movies_age_rating.disney_data
        ),
      },
    ],
  };

  const netflixSeriesAgePie = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      width: 352,
      backgroundColor: "#1d2025",
    },
    title: {
      text: "Netflix",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: pieColors(
          Highcharts,
          "#FF4B61",
          series_age_rating.information.length
        ),
        dataLabels: {
          enabled: true,
          color: "#ffffff",
        },
      },
    },
    series: [
      {
        name: "Age Rating",
        data: dataSeperator(
          series_age_rating.information,
          series_age_rating.netflix_data
        ),
      },
    ],
  };

  const primeSeriesAgePie = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      width: 305,
      backgroundColor: "#1d2025",
    },
    title: {
      text: "Prime Video",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: pieColors(
          Highcharts,
          "#009BEC",
          series_age_rating.information.length
        ),
        dataLabels: {
          enabled: true,
          color: "#ffffff",
        },
      },
    },
    series: [
      {
        name: "Age Rating",
        data: dataSeperator(
          series_age_rating.information,
          series_age_rating.prime_data
        ),
      },
    ],
  };

  const disneySeriesAgePie = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      width: 315,
      backgroundColor: "#1d2025",
    },
    title: {
      text: "Disney+ Hotstar",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: pieColors(
          Highcharts,
          "#634ab0",
          series_age_rating.information.length
        ),
        dataLabels: {
          enabled: true,
          color: "#ffffff",
        },
      },
    },
    series: [
      {
        name: "Age Rating",
        data: dataSeperator(
          series_age_rating.information,
          series_age_rating.disney_data
        ),
      },
    ],
  };

  const allMovieGenreSpline = {
    chart: {
      type: "spline",
    },
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "Total Movies",
      },
    },
    xAxis: {
      categories: movies_genre.information,
      crosshair: true,
    },
    tooltip: {
      shared: true,
      valueSuffix: " movies",
    },
    series: [
      {
        name: "Netflix",
        data: movies_genre.netflix_data,
      },
      {
        name: "Prime Video",
        data: movies_genre.prime_data,
      },
      {
        name: "Disney+ Hotstar",
        data: movies_genre.disney_data,
      },
    ],
  };

  const allSeriesGenreSpline = {
    chart: {
      type: "spline",
      backgroundColor: "#1d2025",
    },
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "Total Series",
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: " series",
    },
    xAxis: {
      categories: series_genre.information,
      crosshair: true,
    },
    series: [
      {
        name: "Netflix",
        data: series_genre.netflix_data,
      },
      {
        name: "Prime Video",
        data: series_genre.prime_data,
      },
      {
        name: "Disney+ Hotstar",
        data: series_genre.disney_data,
      },
    ],
  };

  const imdbMoviesStack = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: movies_imdb_rating.information,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "Total Movies",
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>",
      shared: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.15,
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "Netflix",
        data: movies_imdb_rating.netflix_data,
      },
      {
        name: "Prime Video",
        data: movies_imdb_rating.prime_data,
      },
      {
        name: "Disney+ Hotstar",
        data: movies_imdb_rating.disney_data,
      },
    ],
  };

  const imdbSeriesStack = {
    chart: {
      type: "column",
      backgroundColor: "#1d2025",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: series_imdb_rating.information,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "Total Series",
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
    },
    plotOptions: {
      column: {
        pointPadding: 0.15,
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: "Netflix",
        data: series_imdb_rating.netflix_data,
      },
      {
        name: "Prime Video",
        data: series_imdb_rating.prime_data,
      },
      {
        name: "Disney+ Hotstar",
        data: series_imdb_rating.disney_data,
      },
    ],
  };

  const langMoviesArea = {
    chart: {
      type: "areaspline",
      zoomType: "x",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: movies_language.information,
    },
    yAxis: {
      title: {
        text: "Total Movies",
      },
    },
    tooltip: {
      enabled: true,
      pointFormat: "<b>{series.name}</b>{point.name}: {point.y}",
    },

    credits: {
      enabled: false,
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
      },
    },
    series: [
      {
        name: "Netflix",
        data: movies_language.netflix_data,
      },
      {
        name: "Prime Video",
        data: movies_language.prime_data,
      },
      {
        name: "Disney+ Hotstar",
        data: movies_language.disney_data,
      },
    ],
  };

  const langSeriesArea = {
    chart: {
      type: "areaspline",
      zoomType: "x",
      backgroundColor: "#1d2025",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: series_language.information,
    },
    yAxis: {
      title: {
        text: "Total series",
      },
    },
    tooltip: {
      enabled: true,
      pointFormat: "<b>{series.name}</b>{point.name}: {point.y}",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
      },
    },
    series: [
      {
        name: "Netflix",
        data: series_language.netflix_data,
      },
      {
        name: "Prime Video",
        data: series_language.prime_data,
      },
      {
        name: "Disney+ Hotstar",
        data: series_language.disney_data,
      },
    ],
  };

  const market3dPie19 = {
    colors: [
      "#634ab0",
      "#009BEC",
      "#FF4B61",
      "#3EB364",
      "#F1E30C",
      "#F05020",
      "#F01872",
      "#009BEC",
      "#464eb4",
    ],
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      text: "",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: true,
          color: "#ffffff",
          format: "{point.name}",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Market share 2019",
        data: dataSeperator2(
          market_share.information,
          market_share.netflix_data
        ),
      },
    ],
  };

  const market3dPie20 = {
    colors: [
      "#634ab0",
      "#009BEC",
      "#FF4B61",
      "#F1E30C",
      "#F05020",
      "#F01872",
      "#009BEC",
      "#464eb4",
    ],
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      text: "",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: true,
          color: "#ffffff",
          format: "{point.name}",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Market share 2020",
        data: dataSeperator2(market_share.information, market_share.prime_data),
      },
    ],
  };

  const market3dPie21 = {
    colors: [
      "#634ab0",
      "#009BEC",
      "#FF4B61",
      "#3EB364",
      "#009BEC",
      "#F05020",
      "#464eb4",
    ],
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
    },
    title: {
      text: "",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: true,
          color: "#ffffff",
          format: "{point.name}",
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Market share 2021",
        data: dataSeperator2(
          market_share.information,
          market_share.disney_data
        ),
      },
    ],
  };

  const bubbleMovieGenre = {
    chart: {
      type: "packedbubble",
      height: "500px",
    },
    title: {
      text: "",
    },
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}",
    },
    plotOptions: {
      packedbubble: {
        minSize: "50%",
        maxSize: "150%",
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02,
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          filter: {
            property: "y",
            operator: ">",
            value: 7,
          },
          style: {
            color: "#ffffff",
            fontSize: "9px",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
      },
    },
    series: [
      {
        name: "Netflix",
        data: dataSeperator3(
          movies_language.information,
          movies_language.netflix_data
        ),
      },
      {
        name: "Prime Video",
        data: dataSeperator3(
          movies_language.information,
          movies_language.prime_data
        ),
      },
      {
        name: "Disney+ Hotstar",
        data: dataSeperator3(
          movies_language.information,
          movies_language.disney_data
        ),
      },
    ],
  };

  const bubbleSeriesGenre = {
    chart: {
      type: "packedbubble",
      height: "500px",
      backgroundColor: "#1d2025",
    },
    title: {
      text: "",
    },
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}",
    },
    plotOptions: {
      packedbubble: {
        minSize: "50%",
        maxSize: "150%",
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02,
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",

          style: {
            color: "#ffffff",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
      },
    },
    series: [
      {
        name: "Netflix",
        data: dataSeperator3(
          series_language.information,
          series_language.netflix_data
        ),
      },
      {
        name: "Prime Video",
        data: dataSeperator3(
          series_language.information,
          series_language.prime_data
        ),
      },
      {
        name: "Disney+ Hotstar",
        data: dataSeperator3(
          series_language.information,
          series_language.disney_data
        ),
      },
    ],
  };

  const userGrowthSpline = {
    chart: {
      type: "spline",
      backgroundColor: "#1d2025",
    },
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "Total subscribers",
      },
    },
    xAxis: {
      categories: user_growth.information,
      crosshair: true,
      plotBands: [
        {
          from: 1.75,
          to: 2.25,
          color: "rgba(68, 170, 213, .2)",
        },
      ],
    },
    tooltip: {
      shared: true,
      valueSuffix: " Million",
    },
    annotations: [
      {
        draggable: "",
        labelOptions: {
          backgroundColor: "rgba(255,255,255,0.5)",
          verticalAlign: "top",
          y: 15,
          borderRadius: 10,
        },
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 3,
              y: 86,
            },
            text: "Increase of 35M",
          },
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 3,
              y: 142,
            },
            text: "Increase of 6M",
          },
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 3,
              y: 203,
            },
            text: "Increase of 6M",
          },
        ],
      },
      {
        draggable: "",
        labelOptions: {
          borderRadius: 10,
        },
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: 2.0,
              y: 225,
            },
            text: "Start of COVID-19",
          },
        ],
      },
    ],
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "line",
        color: "#ffffff",
        name: "Linear Netflix",
        dashStyle: "longdash",
        data: [
          [0, 110],
          [3, 197],
        ],
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 0,
          },
        },
        enableMouseTracking: false,
      },
      {
        type: "line",
        color: "#ffffff",
        name: "Linear Prime Video",
        dashStyle: "longdash",
        data: [
          [0, 100],
          [3, 136],
        ],
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 0,
          },
        },
        enableMouseTracking: false,
      },
      {
        type: "line",
        color: "#bbc1c7",
        name: "Linear Disney+ Hotstar",
        dashStyle: "longdash",
        data: [
          [1, 0],
          [3, 52],
        ],
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 0,
          },
        },
        enableMouseTracking: false,
      },
      {
        name: "Netflix",
        data: user_growth.netflix_data,
      },
      {
        name: "Prime Video",
        data: user_growth.prime_data,
      },
      {
        name: "Disney+ Hotstar",
        data: user_growth.disney_data,
      },
    ],
  };

  // State for changing the 3D pie charts for market share
  const [options, setoptions] = useState({
    pie19: true,
    pie20: false,
    pie21: false,
  });

  return (
    <div className="dashboard-content">
      {/* INTRO */}
      <div className="intro">
        <ManImg className="man-img" />
        <div className="title">Welcome to your Dashboard!!</div>
        <div className="text">
          Here you can find a comparative study between the top OTT platforms
          i.e. Netflix, Prime Video and Disney+ Hotstar. Go ahead and play with
          the graphs and find useful insights!!
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Age Rating Distribution for movies */}
          <div className="movies">
            <div className="tooltip">
              <img src={InsightIcon} alt="" />
              <div className="tooltip-content">
                <div>Some Insights:</div>
                <ul>
                  <li>
                    Both Prime Video and Netflix have a huge catalogue of R(18+)
                    rated movies.
                  </li>
                  <li>
                    Netflix provides more movies for teens where as Prime Video
                    provides more movies for kids.
                  </li>
                  <li>
                    Disney+ Hotstar focuses more on family and kids movies.
                  </li>
                </ul>
              </div>
            </div>
            <div className="title">Age Rating Distribution of Movies</div>
            <div className="subtitle">
              Check how many movies are available for a particular age rating.
            </div>
            <div className="age-pies">
              <div className="pie">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={netflixMovieAgePie}
                />
              </div>
              <div className="pie">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={primeMovieAgePie}
                />
              </div>
              <div className="pie">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={disneyMovieAgePie}
                />
              </div>
            </div>
          </div>

          {/* Age Rating Distribution of Series */}
          <div className="series">
            <div className="title">Age Rating Distribution of Series</div>
            <div className="subtitle">
              Check how many series are available for a particular age rating.
            </div>
            <div className="tooltip">
              <img src={InsightIcon} alt="" />
              <div className="tooltip-content">
                <div>Some Insights:</div>
                <ul>
                  <li>
                    Netflix focuses on more R(18+) rated series and has lesser
                    content available for teens.
                  </li>
                  <li>
                    Prime Video focuses on teen friendly series and has a well
                    distributed catalogue.
                  </li>
                  <li>
                    Disney+ Hotstar focuses more on family and kids content but
                    along with this they also provide some content for the
                    adults.
                  </li>
                </ul>
              </div>
            </div>
            <div className="age-pies">
              <div className="pie">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={netflixSeriesAgePie}
                />
              </div>
              <div className="pie">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={primeSeriesAgePie}
                />
              </div>
              <div className="pie">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={disneySeriesAgePie}
                />
              </div>
            </div>
          </div>

          {/* Genre Distribution of Movies */}
          <div className="movies genre">
            <div className="title">Genre Curves of Movies</div>
            <div className="subtitle">
              Check the genre distribution of available movies.
            </div>
            <div className="tooltip">
              <img src={InsightIcon} alt="" />
              <div className="tooltip-content">
                <div>Some Insights:</div>
                <ul>
                  <li>
                    Drama is the top genre followed by Comedy and Thriller on
                    all the platforms.
                  </li>
                  <li>
                    Where Prime Video lacks in series it makes up by providing a
                    huge catalogue of movies.
                  </li>
                  <li>
                    Disney+ Hotstar has the lowest number of movies of all the
                    3.
                  </li>
                </ul>
              </div>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={allMovieGenreSpline}
            />
          </div>

          {/* Genre Distribution of Series */}
          <div className="series genre">
            <div className="title">Genre Curves of Series</div>
            <div className="subtitle">
              Check the genre distribution of available series.
            </div>
            <div className="tooltip">
              <img src={InsightIcon} alt="" />
              <div className="tooltip-content">
                <div>Some Insights:</div>
                <ul>
                  <li>
                    Drama is the top genre followed by Comedy on all the
                    platforms.
                  </li>
                  <li>
                    Netflix has the biggest catalogue of series followed by
                    Disney+ Hotstar and Prime Video.
                  </li>
                  <li>
                    Disney+ Hotstar being new to the market seems to be focusing
                    more on series than movies.
                  </li>
                </ul>
              </div>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={allSeriesGenreSpline}
            />
          </div>

          {/* Rating Distribution of Movies and Series */}
          <div className="rating-stacks">
            <div className="movies stack">
              <div className="title">Rating Distribution of Movies</div>
              <div className="subtitle">
                Check IMDB Ratings of available movies.
              </div>
              <HighchartsReact
                highcharts={Highcharts}
                options={imdbMoviesStack}
              />
            </div>
            <div className="series stack">
              <div className="title">Rating Distribution of Series</div>
              <div className="subtitle">
                Check IMDB Ratings of available series.
              </div>
              <HighchartsReact
                highcharts={Highcharts}
                options={imdbSeriesStack}
              />
            </div>
          </div>

          {/* Language Distribution of Movies */}
          <div className="movies lang">
            <div className="title">Language Distribution of Movies</div>
            <div className="subtitle">
              Check the language distribution of available movies.
            </div>
            <div className="tooltip">
              <img src={InsightIcon} alt="" />
              <div className="tooltip-content">
                <div>Some Insights:</div>
                <ul>
                  <li>
                    English, Hindi and Spanish are the top languages in which
                    movies are available on these platforms.
                  </li>
                  <li>
                    There are clearly more choices for languages in Movies.
                  </li>
                  <li>
                    Disney+ Hotstar being new has less number of movies to
                    offer.
                  </li>
                </ul>
              </div>
            </div>
            <div className="image" onClick={() => setvis(!vis)}>
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/change--v2.png"
                alt="change"
                title="Change Visualisation"
              />
            </div>
            {vis ? (
              <HighchartsReact
                highcharts={Highcharts}
                options={langMoviesArea}
              />
            ) : (
              <HighchartsReact
                highcharts={Highcharts}
                options={bubbleMovieGenre}
              />
            )}
          </div>

          {/* Language Distribution of Series */}
          <div className="series lang">
            <div className="title">Language Distribution of Series</div>
            <div className="subtitle">
              Check the language distribution of available series.
            </div>
            <div className="tooltip">
              <img src={InsightIcon} alt="" />
              <div className="tooltip-content">
                <div>Some Insights:</div>
                <ul>
                  <li>
                    We can clearly notice that on all the platforms English is
                    the language which shows dominance.
                  </li>
                  <li>
                    As compared to movies, series have less language options.
                  </li>
                  <li>Prime Video has the lowest number of series.</li>
                </ul>
              </div>
            </div>
            <div className="image" onClick={() => setvis2(!vis2)}>
              <img
                src="https://img.icons8.com/ios-glyphs/30/000000/change--v2.png"
                alt="change"
                title="Change Visualisation"
              />
            </div>
            {vis2 ? (
              <HighchartsReact
                highcharts={Highcharts}
                options={langSeriesArea}
              />
            ) : (
              <HighchartsReact
                highcharts={Highcharts}
                options={bubbleSeriesGenre}
              />
            )}
          </div>

          {/* Market share of the Indian OTTs */}
          <div className="movies market-share">
            <div className="pie">
              {options.pie19 ? (
                <HighchartsReact
                  allowChartUpdate={true}
                  highcharts={Highcharts}
                  options={market3dPie19}
                />
              ) : null}
              {options.pie20 ? (
                <HighchartsReact
                  allowChartUpdate={true}
                  highcharts={Highcharts}
                  options={market3dPie20}
                />
              ) : null}
              {options.pie21 ? (
                <HighchartsReact
                  allowChartUpdate={true}
                  highcharts={Highcharts}
                  options={market3dPie21}
                />
              ) : null}
            </div>
            <div>
              <div className="title">Indian Market Monoploy</div>
              <div className="subtitle">
                Check how the market share of the Indian OTTs has changed over
                the years.
              </div>
              <div className="settings">
                <button
                  onClick={() =>
                    setoptions({
                      pie19: true,
                      pie20: false,
                      pie21: false,
                    })
                  }
                >
                  2019
                </button>
                <button
                  onClick={() =>
                    setoptions({
                      pie19: false,
                      pie20: true,
                      pie21: false,
                    })
                  }
                >
                  2020
                </button>
                <button
                  onClick={() =>
                    setoptions({
                      pie19: false,
                      pie20: false,
                      pie21: true,
                    })
                  }
                >
                  2021
                </button>
              </div>
              <div className="note">
                Use these buttons to render different charts
              </div>
              <div className="insights">
                <span>Some Insights:</span>
                <ul>
                  <li>
                    In 2019, the market was dominated by Big International
                    Companies like Netflix, Prime Video and Disney+ Hotstar.
                  </li>
                  <li>
                    But during COVID-19 pandemic, Indian OTTs like VOOT and MX
                    player started to take over the market.
                  </li>
                  <li>
                    Currently, these Indian OTTs have comparable share in
                    SVOD(Subscription Video on Demand) market when compared to
                    the International ones.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Subscriber Growth */}
          <div className="series user-growth">
            <div className="title">Subscriber Growth In Recent Years</div>
            <div className="subtitle">
              Check how the subscriber count has changed in the past 4 years.
            </div>
            <div className="tooltip">
              <img src={InsightIcon} alt="" />
              <div className="tooltip-content">
                <div>Some Insights:</div>
                <ul>
                  <li>Before COVID-19, we can see the growth is constant.</li>
                  <li>
                    During the pandemic, significant growth in the subscriber
                    base of these OTTs can be noticed.
                  </li>
                  <li>
                    The COVID-19 lockdowns encouraged people to invest in OTTs
                    as an alternative to movie theaters.
                  </li>
                </ul>
              </div>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              options={userGrowthSpline}
            />
            <div className="note">
              Note: The dotted lines represent a linear growth of these OTTs.
            </div>
          </div>

          {/* Subscription Packages */}
          <div className="movies price-comp">
            <div className="title">Subscription Packages</div>
            <div className="subtitle">
              Compare different subscription package provided by these OTT
              platforms.
            </div>

            <div className="header">
              <div className="range-h">Price Range</div>
              <div className="net-h">Netflix</div>
              <div className="prime-h">Prime Video</div>
              <div className="dis-h">Disney+ Hotstar</div>
            </div>

            {[0, 1, 2, 3, 4].map((el) => {
              let netflix_data = price.netflix_data[el].split(" - ");
              let prime_data = price.prime_data[el].split(" - ");
              let disney_data = price.disney_data[el].split(" - ");
              return (
                <div className="row" key={el}>
                  <div className="range-h">{"₹ " + price.information[el]}</div>
                  <div className="net-h">
                    <div>
                      {netflix_data[0] === "No"
                        ? null
                        : netflix_data[2].split("(")[0]}
                    </div>
                    <div>
                      {netflix_data[0] === "No"
                        ? "—"
                        : netflix_data[2].match(/\(([^)]+)\)/)[1]}
                    </div>
                    <div>
                      {netflix_data[0] === "No" ? null : netflix_data[1]}
                    </div>
                  </div>
                  <div className="prime-h">
                    <div>
                      {prime_data[0] === "No"
                        ? null
                        : prime_data[2].split("(")[0]}
                    </div>
                    <div>
                      {prime_data[0] === "No"
                        ? "—"
                        : prime_data[2].match(/\(([^)]+)\)/)[1]}
                    </div>
                    <div>{prime_data[0] === "No" ? null : prime_data[1]}</div>
                  </div>
                  <div className="dis-h">
                    <div>
                      {disney_data[0] === "No"
                        ? null
                        : disney_data[2].split("(")[0]}
                    </div>
                    <div>
                      {disney_data[0] === "No"
                        ? "—"
                        : disney_data[2].match(/\(([^)]+)\)/)[1]}
                    </div>
                    <div>{disney_data[0] === "No" ? null : disney_data[1]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// Pulling props from redux store
const mapStateToProps = createStructuredSelector({
  movies_age_rating: selectMovieAgeRating,
  series_age_rating: selectSeriesAgeRating,
  movies_genre: selectMovieGenre,
  series_genre: selectSeriesGenre,
  movies_imdb_rating: selectMovieIMDB,
  series_imdb_rating: selectSeriesIMDB,
  movies_language: selectMovieLang,
  series_language: selectSeriesLang,
  market_share: selectMarketShare,
  user_growth: selectUserGrowth,
  price: selectPrice,
});

export default connect(mapStateToProps)(DashboardContent);
