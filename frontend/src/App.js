import React from "react";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SidePanel from "./components/LoginFormPage/sidePanel";
import "./App.css"
import Footer from "./components/LoginFormPage/footer";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <div id="signed-out">
            <div id="signed-out-main">
              <SidePanel />
              <LoginFormPage />
            </div>
            <Footer/>
          </div>
        </Route>
        <Route exact path="/home">
          <Navigation />
        </Route>
      </Switch>
    </>
  );
}

export default App;