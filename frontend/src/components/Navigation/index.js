import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let nav;
  if (sessionUser) {
    nav = (
      <>
        <div id="navigation">
          <div id="nav-left">
            <a href="/home"><img src="../../../img/facebook.ico" className='home-icon'/></a>
            <SearchBar />
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
