import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ToDo from "../components/ToDo/ToDo";



function Routes() {
  let isAuthenticated = false;
  let user = localStorage.getItem('user');
  try {
    isAuthenticated = JSON.parse(user).token ? true : false;
  } catch (e) {
  }
  return (
    <div>
      <Router>
        <Switch>
            <Route exact path="/">
              {isAuthenticated ? <Redirect to="/list" /> : <Login/>}
            </Route>
            <Route exact path="/register">
              {isAuthenticated ? <Redirect to="/list" /> : <Register/>}
            </Route>
            <Route exact path="/list">
              {isAuthenticated ? <ToDo/> : <Redirect to="/" />}
            </Route>
            <Route>
              <Redirect to="/list" />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;