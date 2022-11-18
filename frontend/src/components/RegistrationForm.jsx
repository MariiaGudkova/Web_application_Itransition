import "./RegistrationForm.css";
import { Link } from "react-router-dom";

function RegistrationForm(props) {
  const {
    name,
    subtitleText,
    buttonText,
    linkText,
    linkAdress,
    onSubmit,
    children,
  } = props;
  return (
    <div className="registration">
      <p className="fs-1 text-light fw-bold registration-title">
        Разлогинь или удали
      </p>
      <form className={`form form-${name}`} onSubmit={onSubmit}>
        <h1 className="h3 mb-3 fw-normal text-light form-subtitle">
          {subtitleText}
        </h1>
        {children}
        <button
          className="w-100 btn btn-lg btn-warning fw-bold form-button"
          type="submit"
        >
          {buttonText}
        </button>
        <Link className="mt-5 mb-3 text-light form-transition" to={linkAdress}>
          {linkText}
        </Link>
      </form>
    </div>
  );
}

export default RegistrationForm;
