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
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cells, setCells] = React.useState([]);
  const [isCheckedAll, setCheckedAll] = React.useState(false);
  const history = useHistory();
  const ids = cells.filter((cell) => cell.isChecked).map((cell) => cell._id);

  React.useEffect(() => {
    if (loggedIn) {
      getApiUserInfo();
      getApiCellsInfo();
    }
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  async function hanldeRegistration(email, password) {
    try {
      const response = await register(email, password);
      if (response.data) {
        history.push(routes.signIn);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function hanldeLogin(email, password) {
    try {
      const response = await authorize(email, password);
      if (response.token) {
        localStorage.setItem("jwt", response.token);
        setLoggedIn(true);
        api.updateToken(response.token);
        history.push(routes.baseRoute);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function getApiUserInfo() {
    try {
      const userInfo = await api.getUserInfo();
      setCurrentUser(userInfo._id);
    } catch (e) {
      console.error(e);
    }
  }

  async function getApiCellsInfo() {
    try {
      const cells = await api.getAllUsers();
      setCells(cells.map((cell) => ({ ...cell, isChecked: false })));
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

  async function deleteUserProfile() {
    try {
      const response = await api.deleteUser(ids);
      if (ids.includes(currentUser)) {
        logoutUserProfile();
      }
      const updateCells = cells.filter((cell) => {
        return !ids.includes(cell._id);
      });
      setCells(updateCells);
    } catch (e) {
      console.error();
    }
  }

  async function blockUserProfile() {
    try {
      const response = await api.blockUser(ids, "Заблокирован");
      if (ids.includes(currentUser)) {
        logoutUserProfile();
      }
      const updateCells = cells.map((cell) => {
        if (ids.includes(cell._id)) {
          return { ...cell, status: "Заблокирован" };
        } else {
          return cell;
        }
      });
      setCells(updateCells);
    } catch (e) {
      console.error();
    }
  }

  async function unblockUserProfile() {
    try {
      const response = await api.unblockUser(ids, "Разблокирован");
      const updateCells = cells.map((cell) => {
        if (ids.includes(cell._id)) {
          return { ...cell, status: "Разблокирован" };
        } else {
          return cell;
        }
      });
      setCells(updateCells);
    } catch (e) {
      console.error();
    }
  }

  function checkAll() {
    const newCells = cells.map((cell) => ({
      ...cell,
      isChecked: !isCheckedAll,
    }));
    setCells(newCells);
    setCheckedAll(!isCheckedAll);
  }

  function updateCellChecked(id, isChecked) {
    const newCells = cells.map((cell) =>
      cell._id === id ? { ...cell, isChecked } : cell
    );
    setCells(newCells);
    setCheckedAll(newCells.every((cell) => cell.isChecked));
  }

  return (
    <div className="main-container">
      <Switch>
        <ProtectedRoute exact path={routes.baseRoute} loggedIn={loggedIn}>
          <Header
            buttonText="Выйти"
            linkAdress={routes.signIn}
            onLogoutUserProfile={logoutUserProfile}
          />
          <Main
            cells={cells}
            isCheckedAll={isCheckedAll}
            onCheckAll={checkAll}
            onUpdateCellChecked={updateCellChecked}
            onUnblockUserClick={unblockUserProfile}
            onBlockUserClick={blockUserProfile}
            onDeleteUserClick={deleteUserProfile}
          />
        </ProtectedRoute>
        <Route path={routes.signUp}>
          <Header buttonText="Войти" linkAdress={routes.signIn} />
          <Register onRegistrationSubmit={hanldeRegistration} />
        </Route>
        <Route path={routes.signIn}>
          <Header buttonText="Зарегистрироваться" linkAdress={routes.signUp} />
          <Login onLoginSubmit={hanldeLogin} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
