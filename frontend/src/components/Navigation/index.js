import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';
import { useDispatch } from 'react-redux';
import { getUser } from '../../store/users';
import { useEffect } from 'react';
import * as sessionActions from "../../store/session"
import { useHistory } from "react-router-dom";
import { getUsers } from '../../store/users';
import { getPosts } from '../../store/posts';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const users = useSelector(state => state.users);
  const posts = useSelector(state => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sessionActions.restoreSession());
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch])

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
