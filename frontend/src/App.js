import React from "react";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SidePanel from "./components/LoginFormPage/sidePanel";
import "./App.css"

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route exact path="/">
            <div id="home-page-main">
              <SidePanel />
              <LoginFormPage />
            </div>
          </Route>
        </Switch>
    </>
  );
}

export default App;