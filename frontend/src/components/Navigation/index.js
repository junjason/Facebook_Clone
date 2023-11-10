import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let nav;
  if (sessionUser) {
    nav = (
      <ProfileButton user={sessionUser} />
    );
  } 

  return (
    <>
      {nav}
    </>
  );
}

export default Navigation;
