import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {
  const { loggedIn, children } = props;
  return (
    <Route>{() => (loggedIn ? children : <Redirect to="/sign-in" />)}</Route>
  );
}

export default ProtectedRoute;
