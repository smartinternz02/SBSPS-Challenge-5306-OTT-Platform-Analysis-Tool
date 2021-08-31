// Importing Libraries and stylesheets
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Highcharts from "highcharts";
import HighMaps from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./netflix-data.styles.scss";

// Importing Components
import Loader from "../loader/loader.component";

// Importing Actions
import {
  fetchNetflixMap,
  fetchNetflixMovieGenre,
  fetchNetflixMovieLanguage,
  fetchNetflixSeriesGenre,
  fetchNetflixSeriesLanguage,
} from "../../redux/netflix/netflixActions";

// Importing selectors
import {
  selectNetflixMovieGenre,
  selectNetflixMovieLang,
  selectNetflixSeriesGenre,
  selectNetflixSeriesLang,
  selectNetflixMap,
} from "../../redux/netflix/netflixSelector";

import {
  selectMovieAgeRating,
  selectMovieIMDB,
  selectSeriesAgeRating,
  selectSeriesIMDB,
  selectUserGrowth,
  selectPrice,
} from "../../redux/data/dataSelector";

// Data for word cloud
import { netCloudData } from "../cloudData";

// Importing utility funtions
import {
  pieColors2,
  dataSeperator2,
  dataSeperator4,
  dataSeperator5,
  sleep,
} from "../utils";

// Importing Custom Hook
import useInterval from "../../hooks/use-interval";

// Importing Highcharts additional modules
const cloudmap = require("highcharts/modules/wordcloud");
cloudmap(Highcharts);
const gauge = require("highcharts/modules/solid-gauge");
gauge(Highcharts);
const treemap = require("highcharts/modules/treemap");
treemap(Highcharts);
const heatmap = require("highcharts/modules/heatmap");
heatmap(Highcharts);

// GeoJSON data for world map
const world = require("@highcharts/map-collection/custom/world.geo.json");

// Component for showing detailed analysis of Netflix
const NetflixData = (state) => {
  // State for loading till data is retrieved
  const [isLoading, setIsLoading] = useState(true);

  // States for real-time graph
  const [pos, setPos] = useState([40]);
  const [neu, setNeu] = useState([25]);
  const [neg, setNeg] = useState([15]);
  const [time, setTime] = useState([
    Math.round(new Date().getTime()) + 19800000,
  ]);

  // Function to introduce delay in a sub routine
  const wait = async (ms) => {
    await sleep(ms);
    setIsLoading(false);
  };

  // Component Did Mount
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    dispatch(fetchNetflixMovieGenre());
    dispatch(fetchNetflixMovieLanguage());
    dispatch(fetchNetflixSeriesGenre());
    dispatch(fetchNetflixSeriesLanguage());
    dispatch(fetchNetflixMap());
  }, []);

  useEffect(() => {
    wait(3000);
  }, []);

  // Function for fetching the results from our API for realtime tweet analysis
  const fetchTwitForNetflix = async () => {
    try {
      const res = await fetch(
        "https://sentiment-analysis-tan1-brash-sable-ir.eu-gb.mybluemix.net",
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            data: "1",
          }),
        }
      );

      const data = await res.json();

      if (data.Total === undefined) {
        setPos((pos) => [...pos, pos[pos.length - 1]]);
        setNeu((neu) => [...neu, neu[neu.length - 1]]);
        setNeg((neg) => [...neg, neg[neg.length - 1]]);
        setTime((time) => [
          ...time,
          Math.round(new Date().getTime()) + 19800000,
        ]);
      } else {
        setPos((pos) => [...pos, data.Total.positive]);
        setNeu((neu) => [...neu, data.Total.neutral]);
        setNeg((neg) => [...neg, data.Total.negative]);
        setTime((time) => [
          ...time,
          Math.round(new Date().getTime()) + 19800000,
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Using Custom Hook to call the above function in a interval of 30s
  useInterval(() => {
    fetchTwitForNetflix();
  }, 30000);

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
    map_data,
    price,
    user_growth,
  } = state;

  // Highcharts Option objects for different graphs
  const gaugeNetflix = {
    chart: {
      type: "solidgauge",
      height: "110%",
      backgroundColor: "#15181c",
      width: 360,
    },
    colors: ["#5AA469", "#F8D49D", "#D35D6E"],
    title: {
      text: "Customer Satisfaction Gauge",
      style: {
        color: "white",
        fontSize: "24px",
      },
    },

    tooltip: {
      borderWidth: 0,
      backgroundColor: "none",
      shadow: false,
      style: {
        fontSize: "15px",
        color: "white",
      },
      valueSuffix: "%",
      pointFormat:
        '{series.name}<br><span style="font-size:1.7em; color: {point.color}; font-weight: bold">{point.y}</span>',
      positioner: function (labelWidth) {
        return {
          x: (this.chart.chartWidth - labelWidth + 4) / 2,
          y: this.chart.plotHeight / 2 + 55,
        };
      },
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [
        {
          // Track for Positive
          outerRadius: "112%",
          innerRadius: "88%",
          backgroundColor: Highcharts.color("#5AA469").setOpacity(0.3).get(),
          borderWidth: 0,
        },
        {
          // Track for Neutral
          outerRadius: "87%",
          innerRadius: "63%",
          backgroundColor: Highcharts.color("#F8D49D").setOpacity(0.3).get(),
          borderWidth: 0,
        },
        {
          // Track for Negative
          outerRadius: "62%",
          innerRadius: "38%",
          backgroundColor: Highcharts.color("#D35D6E").setOpacity(0.3).get(),
          borderWidth: 0,
        },
      ],
    },

    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false,
        },
        linecap: "round",
        stickyTracking: false,
        rounded: true,
      },
    },

    series: [
      {
        name: "Positive",
        data: [
          {
            color: "#5AA469",
            radius: "112%",
            innerRadius: "88%",
            y: 15.2,
          },
        ],
      },
      {
        name: "Neutral",
        data: [
          {
            color: "#F8D49D",
            radius: "87%",
            innerRadius: "63%",
            y: 74.1,
          },
        ],
      },
      {
        name: "Negative",
        data: [
          {
            color: "#D35D6E",
            radius: "62%",
            innerRadius: "38%",
            y: 10.6,
          },
        ],
      },
    ],
  };

  const cloudNetflix = {
    colors: ["#fac8cf", "#f48090", "#F04A61"],
    series: [
      {
        type: "wordcloud",
        data: netCloudData,
        minFontSize: 8,
        maxFontSize: 50,
        name: "Occurrences",
      },
    ],
    title: {
      text: "Wordcloud of reviews",
      style: {
        fontSize: 22,
      },
    },
  };

  const realtimeNetflixSpline = {
    chart: {
      type: "spline",
      backgroundColor: "#1d2025",
    },
    colors: ["#5AA469", "#F8D49D", "#D35D6E"],
    legend: {
      enabled: true,
    },
    title: {
      text: "",
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%H:%M:%S}",
        align: "right",
        rotation: -30,
      },
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "No. of tweets",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          style: {
            color: "#ffffff",
          },
        },
      },
    },
    series: [
      {
        name: "Positive",

        data: dataSeperator2(time, pos),
        tooltip: {
          valueSuffix: " tweets",
        },
      },
      {
        name: "Neutral",

        data: dataSeperator2(time, neu),
        tooltip: {
          valueSuffix: " tweets",
        },
      },
      {
        name: "Negative",

        data: dataSeperator2(time, neg),
        tooltip: {
          valueSuffix: " tweets",
        },
      },
    ],
  };

  const netflixMovieLangTree = {
    legend: {
      enabled: false,
    },
    colorAxis: {
      maxColor: Highcharts.getOptions().colors[0],
      minColor: "#ffffff",
    },

    series: [
      {
        type: "treemap",
        layoutAlgorithm: "squarified",
        allowDrillToNode: true,
        animationLimit: 1000,
        levels: [
          {
            level: 1,
            dataLabels: {
              enabled: true,
            },
          },
          {
            level: 2,
            dataLabels: {
              enabled: false,
            },
          },
        ],
        levelIsConstant: false,
        data: dataSeperator4(
          movies_language.information,
          movies_language.ott_data,
          30
        ),
        dataLabels: {
          style: {
            textOutline: "none",
            color: "#15181c",
          },
        },
      },
    ],
    title: {
      text: "",
    },
  };

  const netflixSeriesLangTree = {
    chart: {
      backgroundColor: "#1d2025",
    },
    legend: {
      enabled: false,
    },
    colorAxis: {
      maxColor: Highcharts.getOptions().colors[0],
      minColor: "#ffffff",
    },
    series: [
      {
        type: "treemap",
        layoutAlgorithm: "squarified",
        allowDrillToNode: true,
        animationLimit: 1000,
        levels: [
          {
            level: 1,
            dataLabels: {
              enabled: true,
            },
          },
          {
            level: 2,
            dataLabels: {
              enabled: false,
            },
          },
        ],
        levelIsConstant: false,
        data: dataSeperator4(
          series_language.information,
          series_language.ott_data,
          20
        ),
        dataLabels: {
          style: {
            textOutline: "none",
            color: "#1d2025",
          },
        },
      },
    ],
    title: {
      text: "",
    },
  };

  const netflixSubMap = {
    chart: {
      map: "custom/world",
      borderWidth: 0,
      backgroundColor: "#15181c",
      animation: false,
    },

    title: {
      text: "",
    },

    mapNavigation: {
      enabled: false,
    },

    colorAxis: {
      min: 0,
      minColor: "#F7A4B0",
      maxColor: "#F04A61",
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    tooltip: {
      style: {
        color: "#ffffff",
      },
      backgroundColor: "none",
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      padding: 0,
      pointFormat:
        '<span class="f32"><span class="flag {point.properties.hc-key}">' +
        "</span></span> {point.name}<br>" +
        '<span style="font-size:30px">{point.value}</span>',
      positioner: function () {
        return { x: 0, y: 300 };
      },
    },

    series: [
      {
        mapData: world,
        data: dataSeperator5(map_data.code, map_data.subs),
        joinBy: ["iso-a3", "code"],
        animation: true,
        name: "Subscribers",
        states: {
          hover: {
            color: "#464eb4",
          },
        },
        tooltip: {
          valueSuffix: " subs",
        },
        shadow: false,
      },
    ],
  };

  const netflixAgeCompSpline = {
    chart: {
      type: "spline",
      backgroundColor: "#1d2025",
    },
    yAxis: {
      title: {
        text: "Total series/movies",
      },
    },
    title: {
      text: "",
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      categories: series_age_rating.information,
      crosshair: true,
    },
    series: [
      {
        name: "Movies",
        data: movies_age_rating.netflix_data,
        tooltip: {
          valueSuffix: " movies",
        },
        color: "#f692a0",
      },
      {
        name: "Series",
        data: series_age_rating.netflix_data,
        tooltip: {
          valueSuffix: " series",
        },
        color: "#F04A61",
      },
    ],
  };

  const netflixImdbCompSpline = {
    chart: {
      type: "spline",
    },
    yAxis: {
      title: {
        text: "Total series/movies",
      },
    },
    title: {
      text: "",
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      categories: series_imdb_rating.information,
      crosshair: true,
    },
    series: [
      {
        name: "Movies",
        data: movies_imdb_rating.netflix_data,
        tooltip: {
          valueSuffix: " movies",
        },
        color: "#f692a0",
      },
      {
        name: "Series",
        data: series_imdb_rating.netflix_data,
        tooltip: {
          valueSuffix: " series",
        },
        color: "#F04A61",
      },
    ],
  };

  const SG3dPieNetflix = {
    colors: pieColors2(Highcharts, "#F04A61", series_genre.information.length),
    chart: {
      type: "pie",
      backgroundColor: "#1d2025",
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
        edgeWidth: 0.2,
        edgeColor: "#ffffff",
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
        name: "Series Genre %",
        data: dataSeperator2(series_genre.information, series_genre.ott_data),
      },
    ],
  };

  const MG3dPieNetflix = {
    colors: pieColors2(Highcharts, "#F04A61", movies_genre.information.length),
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
        edgeWidth: 0.2,
        edgeColor: "#ffffff",
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
        name: "Movie Genre %",
        data: dataSeperator2(movies_genre.information, movies_genre.ott_data),
      },
    ],
  };

  return (
    <div className="netflix-data">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Total Movies and Series */}
          <div className="total-grid">
            <div className="total-movies">
              <div className="img">
                <img
                  src="https://img.icons8.com/dusk/100/000000/film-reel.png"
                  alt=""
                />
              </div>
              <div className="text">Total Available Movies on NETFLIX</div>
              <div className="amount">
                {movies_genre.ott_data.reduce((acc, curr) => acc + curr, 0)}
              </div>
            </div>
            <div className="total-series">
              <div className="img">
                <img
                  src="https://img.icons8.com/dusk/64/000000/tv.png"
                  alt=""
                />
              </div>
              <div className="text">Total Available Series on NETFLIX</div>
              <div className="amount">
                {series_genre.ott_data.reduce((acc, curr) => acc + curr, 0)}
              </div>
            </div>
          </div>

          {/* Subscriber Distribution */}
          <div className="movies map">
            <div className="title">Subscriber Distribution</div>
            <div className="subtitle">
              Have a look at the number of subscribers in these selected
              countries.
            </div>
            <div style={{ fontSize: 20 }}>
              <span style={{ fontWeight: 700 }}>Total:</span>{" "}
              {user_growth.netflix_data[3]} 000 000 subs
            </div>
            <div className="pie">
              <HighchartsReact
                highcharts={HighMaps}
                constructorType="mapChart"
                options={netflixSubMap}
                allowChartUpdate={false}
              />
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="price-plans">
            <div className="title">Subscription Plans</div>
            <div className="subtitle">
              Have a look at the available Subscription plans on Netflix.
            </div>
            <div className="price-plans-grid">
              {price.netflix_data.map((el, idx) => {
                el = el.split(" - ");
                let exist = el[0];
                let duration;
                let name;
                let cost;
                let imgs = [
                  "https://img.icons8.com/color/96/000000/smartphone.png",
                  "https://img.icons8.com/color/96/000000/laptop--v1.png",
                  "https://img.icons8.com/color/96/000000/tv-on-console.png",
                  "https://img.icons8.com/color/96/000000/filled-star--v1.png",
                ];
                if (exist !== "No") {
                  duration = el[1];
                  name = el[2].split("(")[0];
                  cost = el[2].match(/\(([^)]+)\)/)[1];
                }
                return exist === "No" ? null : (
                  <div className="price-card" key={idx}>
                    <div className="plan-name">{name}</div>
                    <div className="plan-cost">{cost}</div>
                    <div className="duration">{duration}</div>
                    <img src={imgs[idx]} alt="" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Genre Distribution of Movies and Series */}
          <div className="comp-flex">
            <div className="movies">
              <div className="title">Genre Distribution — Movies</div>
              <div className="subtitle">
                Comparison between movies of different available Genres on
                Netflix.
              </div>
              <div className="pie">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={MG3dPieNetflix}
                />
              </div>
            </div>
            <div className="series">
              <div className="title">Genre Distribution — Series</div>
              <div className="subtitle">
                Comparison between series of different available Genres on
                Netflix.
              </div>
              <div className="pie">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={SG3dPieNetflix}
                />
              </div>
            </div>
          </div>

          {/* Language Distribution of Movies */}
          <div className="movies">
            <div className="title">Language Heatmap of Movies</div>
            <div className="subtitle">
              Check the wide variety of languages available on Netflix.
            </div>
            <div className="pie">
              <HighchartsReact
                highcharts={Highcharts}
                options={netflixMovieLangTree}
              />
            </div>
          </div>

          {/* Language Distribution of Series */}
          <div className="series">
            <div className="title">Language Heatmap of Series</div>
            <div className="subtitle">
              Check the wide variety of languages available on Netflix.
            </div>
            <div className="pie">
              <HighchartsReact
                highcharts={Highcharts}
                options={netflixSeriesLangTree}
              />
            </div>
          </div>

          {/* Age Rating Distribution of Movies and Series */}
          <div className="comp-flex">
            <div className="series">
              <div className="title">Age Rating Curves</div>
              <div className="subtitle">
                Comparison between content of different available Age Rating on
                Netflix.
              </div>
              <div className="pie">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={netflixAgeCompSpline}
                />
              </div>
            </div>
            <div className="movies">
              <div className="title">IMDB Rating Curves</div>
              <div className="subtitle">
                Comparison between the quality of content available on Netflix.
              </div>
              <div className="pie">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={netflixImdbCompSpline}
                />
              </div>
            </div>
          </div>

          {/* Real-time Tweet Analysis */}
          <div className="series">
            <div className="title">Real-time Tweet Analysis</div>
            <div className="subtitle">
              Check people's opinions analyzed by our Sentiment Algorithm.
              (Update every 30 seconds)
            </div>
            <div className="pie">
              <HighchartsReact
                highcharts={Highcharts}
                options={realtimeNetflixSpline}
              />
            </div>
          </div>

          {/* Review Analysis */}
          <div className="movies">
            <div className="title">Review Analysis</div>
            <div className="subtitle">
              Check what people are thinking about Netflix.
            </div>
            <div className="cust">
              <span className="gauge">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={gaugeNetflix}
                />
              </span>
              <span className="cloud">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={cloudNetflix}
                />
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Pulling props from redux store
const mapStateToProps = createStructuredSelector({
  movies_genre: selectNetflixMovieGenre,
  movies_language: selectNetflixMovieLang,
  series_genre: selectNetflixSeriesGenre,
  series_language: selectNetflixSeriesLang,
  movies_age_rating: selectMovieAgeRating,
  series_age_rating: selectSeriesAgeRating,
  movies_imdb_rating: selectMovieIMDB,
  series_imdb_rating: selectSeriesIMDB,
  user_growth: selectUserGrowth,
  map_data: selectNetflixMap,
  price: selectPrice,
});

export default connect(mapStateToProps)(NetflixData);
