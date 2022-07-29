import { Link } from "react-router-dom";

import Footer from "../../components/footer/footer";

import "./homePageStyle.css";
const Home = () => {
  return (
    <div className="home-page">
      <div className="bg-secondary mb-1" id="hero">
        <div className="hero-section" style={{ background: `url('${process.env.PUBLIC_URL}/images/scattered-forcefields.svg')` }}>
          <div className="left-content">
            <p className="stay-home">Present.Collaborate.Share</p>
            <h1>Real time Whiteboard Collaboration</h1>
            <p></p>
            <p className="para my-3">
              NyroBoard is a fast, free, and simple-to-use online whiteboard
              built to help you collaborate with others any time, anywhere.
            </p>
            <button className="btn btn-primary">
              <Link to="/board/new" target="_blank">
                Start Collaboration
              </Link>
            </button>
          </div>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/images/undraw_live_collaboration_re_60h.svg`}
              alt="home-svg"
            ></img>
          </div>
        </div>
        <div className="feature-section p-2">
          <div className="feature-section-title text-center p-4">
            <h3>Why Choose NyroBoard</h3>
          </div>
          <div className="row1-container">
            <div className="box box-down cyan">
              <h2>Easy To Use</h2>
              <p>We keep ui very simple so that everyone can easily use it.</p>
              <div className="box-img">
                <img src={`${process.env.PUBLIC_URL}/images/hands.png`} alt="hand" />
              </div>
            </div>

            <div className="box red">
              <h2>Real-time Collaboration</h2>
              <p>
                You can easily collaborate with others through real time audio
                vidoe.
              </p>
              <div className="box-img">
                <img src={`${process.env.PUBLIC_URL}/images/teamwork.png`} alt="teamwork" />
              </div>
            </div>

            <div className="box box-down blue">
              <h2>Cross Browser Support</h2>
              <p>You can use it in any device from anywhere.</p>
              <div className="box-img">
                <img src={`${process.env.PUBLIC_URL}/images/device.png`} alt="device" />
              </div>
            </div>
          </div>
          <div className="row2-container">
            <div className="box orange">
              <h2>Versatile Tool</h2>
              <p>
                Get Huge list of tools that makes collaboration easy and fun.
              </p>
              <div className="box-img">
                <img src={`${process.env.PUBLIC_URL}/images/graphic-tools.png`} alt="graphic-tools" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <Footer />
        </div>
      </div>
    </div >
  );
};

export default Home;
