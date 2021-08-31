// Importing Libraries and stylesheets
import React from "react";
import { useEffect, useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import "./whats-hot-content.styles.scss";

// Importing Icons and Images
import { ReactComponent as LaptopMan } from "../../assets/man-laptop.svg";

// Importing Components
import Loader from "../loader/loader.component";

// Function to fetch trending movies and series
async function getTrendingData(url) {
  let db = [];
  try {
    let response = await fetch(url);
    let data = await response.json();
    db = data.results;
    return db;
  } catch (err) {
    console.log(err);
  }
}

// API KEY removed for security purpose

// Function to fetch providers using the movie/series ID
async function getProvider(type, data) {
  try {
    let providers = await Promise.all(
      data.map(async (indiData) => {
        let response = await fetch(
          `https://api.themoviedb.org/3/${type}/${indiData.id}/watch/providers?api_key=API_KEY`
        );

        let data = await response.json();

        if (data.results.IN) {
          let prov = data.results.IN.flatrate
            ? data.results.IN.flatrate[0].provider_name
            : data.results.IN.buy
            ? data.results.IN.buy[0].provider_name
            : data.results.IN.rent
            ? data.results.IN.rent[0].provider_name
            : "Not Available in India";

          let img = data.results.IN.flatrate
            ? data.results.IN.flatrate[0].logo_path
            : data.results.IN.buy
            ? data.results.IN.buy[0].logo_path
            : data.results.IN.rent
            ? data.results.IN.rent[0].logo_path
            : "Not Available";

          const res = {
            name:
              type === "movie"
                ? indiData.original_title
                : indiData.original_name,
            poster: "https://image.tmdb.org/t/p/w300/" + indiData.poster_path,
            genres: indiData.genre_ids.map((el) => genres[el]),
            provider_name: prov === "Hotstar" ? "Disney+ Hotstar" : prov,
            provider_logo:
              img === "Not Available"
                ? null
                : `https://image.tmdb.org/t/p/w200/${img}`,
            backdrop_path:
              "https://image.tmdb.org/t/p/w500/" + indiData.backdrop_path,
          };

          return res;
        } else {
          const res = {
            name:
              type === "movie"
                ? indiData.original_title
                : indiData.original_name,
            poster: "https://image.tmdb.org/t/p/w200/" + indiData.poster_path,
            genres: indiData.genre_ids.map((el) => genres[el]),
            provider_name: "Not Available in India",
            provider_logo: null,
            backdrop_path:
              "https://image.tmdb.org/t/p/w500/" + indiData.backdrop_path,
          };
          return res;
        }
      })
    );
    return providers;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Genre Key Map
const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  10759: "Action Adventure",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  10762: "Kids",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10763: "News",
  10749: "Romance",
  10764: "Reality",
  10765: "SciFi Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War Politics",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// Component to contain the Whats Hot content
const WhatsHotContent = () => {
  // States to manage trending movies and series
  const [movies, setTrendingMovies] = useState([]);
  const [series, setTrendingSeries] = useState([]);

  // States to manage Loading
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  // Function to get Trending Movies
  const getTrendingMovies = async () => {
    try {
      const trendingMovies = await getTrendingData(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=API_KEY"
      );

      const movies_data = await getProvider("movie", trendingMovies);
      setTrendingMovies(movies_data);
      setLoading1(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to get Trending Series
  const getTrendingShows = async () => {
    try {
      const trendingSeries = await getTrendingData(
        "https://api.themoviedb.org/3/trending/tv/week?api_key=API_KEY"
      );
      const series_data = await getProvider("tv", trendingSeries);
      setTrendingSeries(series_data);
      setLoading2(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Component Did mount
  useEffect(() => {
    getTrendingShows();
  }, []);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="whatshot">
      {/* Intro */}
      <div className="intro">
        <LaptopMan className="image" />
        <div>
          <div className="title">Find the most popular content here!!</div>
          <div className="text">
            Here you can find the most popular and latest movies and series. You
            can also look for tweets of the top OTT handles and see the latest
            releases.
          </div>
        </div>
      </div>

      {/* Trending Series */}
      <div className="title">Check out some trending Series...</div>
      {loading1 ? (
        <Loader />
      ) : (
        <div className="trending-series">
          {series.map((el, idx) => (
            <div
              className="card-container"
              style={{ backgroundImage: `url(${el.backdrop_path})` }}
              key={idx}
            >
              <div className="img-container">
                <img src={el.poster} alt="" />
              </div>
              <div className="info-container">
                <div className="info-div">
                  <div className="name">{el.name}</div>
                  <div className="genres">
                    {el.genres.map((el, idx) => (
                      <span className="genre" key={idx}>
                        {el}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#000",
                    padding: 10,
                    paddingTop: 2,
                    paddingBottom: 5,
                    fontSize: 14,
                    marginTop: 5,
                  }}
                >
                  Available On:
                </div>
                <div className="provider-div">
                  <img
                    src={
                      el.provider_logo
                        ? el.provider_logo
                        : "https://img.icons8.com/color/48/000000/nothing-found.png"
                    }
                    alt=""
                    title={el.provider_name}
                  />
                  <span className="provider-name">{el.provider_name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trending Movies */}
      <div className="title">Check out some trending Movies...</div>
      {loading2 ? (
        <Loader />
      ) : (
        <div className="trending-movies">
          {movies.map((el, idx) => (
            <div
              className="card-container"
              style={{ backgroundImage: `url(${el.backdrop_path})` }}
              key={idx}
            >
              <div className="img-container">
                <img src={el.poster} alt="" />
              </div>
              <div className="info-container">
                <div className="info-div">
                  <div className="name">{el.name}</div>
                  <div className="genres">
                    {el.genres.map((el, idx) => (
                      <span className="genre" key={idx}>
                        {el}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "#000",
                    padding: 10,
                    paddingTop: 2,
                    paddingBottom: 5,
                    fontSize: 14,
                    marginTop: 5,
                  }}
                >
                  Available On:
                </div>
                <div className="provider-div">
                  <img
                    src={
                      el.provider_logo
                        ? el.provider_logo
                        : "https://img.icons8.com/color/48/000000/nothing-found.png"
                    }
                    alt=""
                    title={el.provider_name}
                  />
                  <span className="provider-name">{el.provider_name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tweets */}
      <div className="twitter-section">
        <div className="title">Check what your favourite OTT is upto!!</div>
        <div className="tweets">
          <div className="tweet">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="NetflixIndia"
              theme="dark"
              options={{ height: 500, width: 300 }}
            />
          </div>
          <div className="tweet">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="PrimeVideoIN"
              theme="dark"
              options={{ height: 500, width: 300 }}
            />
          </div>
          <div className="tweet">
            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="DisneyPlusHS"
              theme="dark"
              options={{ height: 500, width: 300 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsHotContent;
