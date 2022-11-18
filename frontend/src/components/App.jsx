import React from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../utils/routes.js";
import ProtectedRoute from "./ProtectedRoure.jsx";
import "./App.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="main-container">
      <Switch>
        <ProtectedRoute exact path={routes.baseRoute} loggedIn={loggedIn}>
          <Header buttonText="Выйти" linkAdress={routes.signIn} />
          <Main />
        </ProtectedRoute>
        <Route path={routes.signUp}>
          <Header buttonText="Войти" linkAdress={routes.signIn} />
          <Register />
        </Route>
        <Route path={routes.signIn}>
          <Header buttonText="Зарегистрироваться" linkAdress={routes.signUp} />
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
