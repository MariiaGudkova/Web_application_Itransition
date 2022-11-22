import React from "react";
import "./Login.css";
import RegistrationForm from "./RegistrationForm";
import { routes } from "../utils/routes.js";

function Login(props) {
  const { onLoginSubmit } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLoginSubmit(email, password);
  }

  return (
    <RegistrationForm
      name="login"
      subtitleText="Вход"
      buttonText="Войти"
      linkText="Если у вас нет аккаунта, нажмите сюда"
      linkAdress={routes.signUp}
      onSubmit={handleSubmit}
    >
      <div className="form-floating">
        <input
          type="email"
          autoComplete="email"
          className="form-control"
          id="email-login-input"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          autoComplete="current-password"
          className="form-control"
          id="password-login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
    </RegistrationForm>
  );
}
export default Login;
