import { Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  const { buttonText, linkAdress } = props;
  return (
    <header className="px-3 py-2 dark-bg header-container">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-lg-start header-content">
          <a
            href="/"
            className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none header-logo"
          >
            <i className="bi-puzzle-fill fs-1"></i>
          </a>
          <div className="text-end">
            <Link to={linkAdress}>
              <button
                type="button"
                className="btn btn-warning bs-success fw-bold header-button"
              >
                {buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
