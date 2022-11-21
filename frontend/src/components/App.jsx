import React from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./App.css";
import api from "../utils/api.js";
import { register } from "../utils/auth.js";
import { authorize } from "../utils/auth.js";
import { routes } from "../utils/routes.js";
import ProtectedRoute from "./ProtectedRoure.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [defaultCells, setDefaultSells] = React.useState({});
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      getApiCellsInfo();
    }
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  async function hanldeRegistration(authData) {
    try {
      const { email, password } = authData;
      const response = await register(password, email);
      if (response.data) {
        history.push(routes.signIn);
      } else {
        throw new Error();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function hanldeAthorization(authData) {
    try {
      const { email, password } = authData;
      const response = await authorize(password, email);
      if (response.token) {
        localStorage.setItem("jwt", response.token);
        api.updateToken(response.token);
        history.push(routes.baseRoute);
      } else {
        throw new Error();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function getApiCellsInfo() {
    try {
      const defaultCells = await api.getAllUsers();
      setDefaultSells(defaultCells);
    } catch (e) {
      console.error(e);
    }
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api
        .getAllUsers(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push(routes.baseRoute);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  function logoutUserProfile() {
    localStorage.removeItem("jwt");
    history.push(routes.signIn);
    setLoggedIn(false);
  }

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
