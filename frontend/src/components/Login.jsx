import "./Login.css";
import RegistrationForm from "./RegistrationForm";
import { routes } from "../utils/routes.js";

function Login() {
  return (
    <RegistrationForm
      name="login"
      subtitleText="Вход"
      buttonText="Войти"
      linkText="Если у вас нет аккаунта, нажмите сюда"
      linkAdress={routes.signUp}
    >
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          id="email-login-input"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="password-login-input"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>
    </RegistrationForm>
  );
}
export default Login;
