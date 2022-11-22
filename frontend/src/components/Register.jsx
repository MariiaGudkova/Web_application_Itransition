import React from "react";
import "./Register.css";
import RegistrationForm from "./RegistrationForm";
import { routes } from "../utils/routes.js";

function Register(props) {
  const { onRegistrationSubmit } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onRegistrationSubmit(email, password);
  }

  return (
    <RegistrationForm
      name="register"
      subtitleText="Регистрация"
      buttonText="Зарегистрироваться"
      linkText="Если вы уже зарегистрированы, нажмите сюда"
      linkAdress={routes.signIn}
      onSubmit={handleSubmit}
    >
      <div className="form-floating">
        <input
          type="email"
          autoComplete="email"
          className="form-control"
          id="email-register-input"
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
          id="password-register-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
    </RegistrationForm>
  );
}

export default Register;
