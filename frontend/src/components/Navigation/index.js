import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom/cjs/react-router-dom';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  // const user = useSelector(state => state.users[sessionUser.id]);
  const history = useHistory();
  const redirectToHome = () => {
    history.push("/home");
  }

  let nav;
  if (sessionUser) {
    nav = (
      <>
        <div id="navigation">
          <div id="nav-left">
            <div id="home-icon" onClick={redirectToHome}><img src="../../../img/facebook.ico" className='home-icon'/></div>
            <SearchBar />
          </div>
          <div id="home-button">
            <Link to="/home" id="home-button-icon" onClick={redirectToHome}>
              <img src="../../../img/home_icon.png" alt="Home" className='home-icon' />
            </Link>
          </div>
          <div id="nav-right">
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      </>
    );
  } 

  return (
    <>
      {nav}
    </>
  );
}

export default Navigation;
