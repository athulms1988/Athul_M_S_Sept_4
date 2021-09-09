import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import List from "../components/List/List";



function Routes() {
  return (
    <div>
      <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/list" component={List} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;