import "./Register.css";
import RegistrationForm from "./RegistrationForm";
import { routes } from "../utils/routes.js";

function Register() {
  return (
    <RegistrationForm
      name="register"
      subtitleText="Регистрация"
      buttonText="Зарегистрироваться"
      linkText="Если вы уже зарегистрированы, нажмите сюда"
      linkAdress={routes.signIn}
    >
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="email-register-input"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="password-register-input"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>
    </RegistrationForm>
  );
}

export default Register;
