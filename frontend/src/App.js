import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import SidePanel from "./components/LoginFormPage/sidePanel";
import "./App.css"
import Footer from "./components/LoginFormPage/footer";
import { useSelector } from "react-redux";


function App() {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) history.push('/');

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