import { Link } from "react-router-dom";
import "./notFoundStyle.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1>Oopsss.... It Looks, You entered wrong url.</h1>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to="/" className="more-link">
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
