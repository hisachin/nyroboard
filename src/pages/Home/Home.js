import { Link } from "react-router-dom";

import Footer from "../../components/footer/footer";

import "./homePageStyle.css";
const Home = () => {
  return (
    <div className="home-page">
      <div class="bg-secondary mb-1" id="hero">
        <div class="hero-section">
          <div class="left-content">
            <p class="stay-home">Present.Collaborate.Share</p>
            <h1>Real time Whiteboard Collaboration</h1>
            <p></p>
            <p class="para my-3">
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
              src="/images/undraw_live_collaboration_re_60h.svg"
              alt="home-svg"
            ></img>
          </div>
        </div>
        <div className="feature-section p-2">
          <div className="feature-section-title text-center p-4">
            <h3>Why Choose NyroBoard</h3>
          </div>
          <div class="row1-container">
            <div class="box box-down cyan">
              <h2>Easy To Use</h2>
              <p>We keep ui very simple so that everyone can easily use it.</p>
              <div className="box-img">
                <img src="/images/hands.png" alt="" />
              </div>
            </div>

            <div class="box red">
              <h2>Real-time Collaboration</h2>
              <p>
                You can easily collaborate with others through real time audio
                vidoe.
              </p>
              <div className="box-img">
                <img src="/images/teamwork.png" alt="" />
              </div>
            </div>

            <div class="box box-down blue">
              <h2>Cross Browser Support</h2>
              <p>You can use it in any device from anywhere.</p>
              <div className="box-img">
                <img src="/images/device.png" alt="" />
              </div>
            </div>
          </div>
          <div class="row2-container">
            <div class="box orange">
              <h2>Versatile Tool</h2>
              <p>
                Get Huge list of tools that makes collaboration easy and fun.
              </p>
              <div className="box-img">
                <img src="/images/graphic-tools.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
