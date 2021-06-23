import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginSignupPage } from "./components/LoginSignupPage";
import { UserDetailPage } from "./components/UserDetailPage";
import { UserListPage } from "./components/UserListPage";

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/user" exact>
            <UserDetailPage />
          </Route>
          <Route path="/users" exact>
            <UserListPage />
          </Route>
          <Route path="/" exact>
            <LoginSignupPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
