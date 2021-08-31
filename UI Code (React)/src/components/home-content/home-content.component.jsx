// Importing Libraries and stylesheets
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./home-content.styles.scss";

// Importing Icons and Images
import { ReactComponent as HeroImg } from "../../assets/hero-img.svg";
import { ReactComponent as WhyOttImg } from "../../assets/whyOTT.svg";
import { ReactComponent as GithubLogo } from "../../assets/github.svg";
import { ReactComponent as LindedInLogo } from "../../assets/linkedin.svg";
import { ReactComponent as MailLogo } from "../../assets/mail.svg";

// Importing Components
import FeatureCard from "../feature-card/feature-card.component";

// Feature objects to render different cards
const features = [
  {
    title: "The Dashboard",
    bgColor: "#634ab0",
    info: "The dashboard will provide you a comparative study between the most populor OTT Platforms.",
    key: 0,
  },
  {
    title: "Detail Analysis",
    bgColor: "#FF4B61",
    info: "This page will provide a detailed analysis of the selected OTT platform in a visually interpretable manner.",
    key: 1,
  },
  {
    title: "OTT Recommender",
    bgColor: "#009BEC",
    info: "This feature will recommend you an OTT platform according to your preferences.",
    key: 2,
  },
  {
    title: "Chatbot",
    bgColor: "#FF4B61",
    info: "The Chatbot will help you find the platform where your favourite series/movies are available and more!",
    key: 3,
  },
  {
    title: "People’s Opinion",
    bgColor: "#009BEC",
    info: "We are extracting real-time twitter feeds related to a given OTT and analysed them to get their sentiment analysis.",
    key: 4,
  },
  {
    title: "What’s hot",
    bgColor: "#634ab0",
    info: "This page will tell you the top series/movies which are trending on different OTT platforms and more!",
    key: 5,
  },
];

// Component to contain the Homepage content
const HomeContent = () => {
  // Pulling params from the redux state
  const name = useSelector((state) => state.firebase.auth.displayName);

  // Component Did Mount
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <div className="home-content">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-img-section">
          <div className="text">
            Trying to find an OTT that’s right for you?
            <br />
            Fear not, you are at the perfect place!
          </div>
          <HeroImg className="hero-img" />
        </div>
        <div className="hero-content">
          <div className="title">Welcome to Find Your Binge!</div>
          <div className="text">
            Hi {name ? name : "user"}, here at Find Your Binge we will help you
            figure out which Over The Top platform is best suited for you. Our
            web-app will provide you with comparisons of the top OTT platforms
            in a visual way so that you can make some sense of these statistics.
            It also provides an indepth analysis of these OTTs and tell you how
            people feel about these platforms.
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="main-title">What we Provide?</div>
        <div className="text">Our web-app provides the following features:</div>
        <div className="feature-grid">
          {features.map(({ info, ...rest }) => (
            <FeatureCard {...rest}>{info}</FeatureCard>
          ))}
        </div>
      </div>

      {/* Why use OTT Section */}
      <div className="why-ott">
        <WhyOttImg />
        <div>
          <div className="title">Why use OTT over cable?</div>
          <div className="reasons">
            <div className="reason">
              OTT platforms enable you to consume content in more places all at
              once not just on TV.
            </div>
            <div className="reason">
              OTT services are also growing their original content libraries to
              help keep their platforms trendy and fresh.
            </div>
            <div className="reason">
              OTT platforms offer more options, for content you really want.
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team">
        <div className="title">Meet Our Team</div>
        <div className="team-grid">
          <div className="ui-team">
            <div className="team-name">UX/UI Team</div>
            <div className="team-members">
              <div className="team-member-card">
                <div className="profile">
                  <img
                    src="https://avatars.githubusercontent.com/u/58233202?s=100&v=4"
                    alt="Akhil"
                  />
                  <div className="details">
                    <div className="name">Akhil Jayan</div>
                    <div className="socials">
                      <a
                        href="https://github.com/akhiljayan29aj"
                        className="git"
                      >
                        <GithubLogo />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/akhiljayan29aj/"
                        className="in"
                      >
                        <LindedInLogo />
                      </a>
                    </div>
                  </div>
                </div>
                <a href="mailto:akhiljayan29.aj@gmail.com" className="mail">
                  <MailLogo />
                </a>
              </div>
              <div className="team-member-card">
                <div className="profile">
                  <img
                    src="https://avatars.githubusercontent.com/u/60072148?v=4"
                    alt="Sravani"
                  />
                  <div className="details">
                    <div className="name">Sravani Sai M</div>
                    <div className="socials">
                      <a
                        href="https://github.com/SravaniMalekar"
                        className="git"
                      >
                        <GithubLogo />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/sravani-malekar/"
                        className="in"
                      >
                        <LindedInLogo />
                      </a>
                    </div>
                  </div>
                </div>
                <a href="mailto:sravani.malekar@gmail.com" className="mail">
                  <MailLogo />
                </a>
              </div>
            </div>
          </div>
          <div className="ml-team">
            <div className="team-name">Data Analytics Team</div>
            <div className="team-members">
              <div className="team-member-card">
                <div className="profile">
                  <img
                    src="https://avatars.githubusercontent.com/u/39722327?v=4"
                    alt="Shashwat"
                  />
                  <div className="details">
                    <div className="name">Shashwat</div>
                    <div className="socials">
                      <a href="https://github.com/Shaxpy" className="git">
                        <GithubLogo />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/shaxpy28/"
                        className="in"
                      >
                        <LindedInLogo />
                      </a>
                    </div>
                  </div>
                </div>
                <a href="mailto:shaswatpandey28@gmail.com" className="mail">
                  <MailLogo />
                </a>
              </div>
              <div className="team-member-card">
                <div className="profile">
                  <img
                    src="https://avatars.githubusercontent.com/u/46688469?v=4"
                    alt="Tanisha"
                  />
                  <div className="details">
                    <div className="name">Tanisha</div>
                    <div className="socials">
                      <a href="https://github.com/tubbytani" className="git">
                        <GithubLogo />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/tanisha-bharol-733992181/"
                        className="in"
                      >
                        <LindedInLogo />
                      </a>
                    </div>
                  </div>
                </div>
                <a href="mailto:tanishabharol@gmail.com" className="mail">
                  <MailLogo />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
