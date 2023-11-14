import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const [profilePicturePath, setProfilePicturePath] = useState("../../img/default_profile_pic.png");
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const history = useHistory();
  const logout = async (e) => {
    e.preventDefault();
    const res = await dispatch(sessionActions.logout());
    // history push, if res is successful
    if (res.ok) {
      history.push('/');
    }
  };

  const redirectToProfilePage = () => {
    history.push(`/user/${user.id}`)
  }

  return (
    <>
      <div id="nav-profile-button">
        <button onClick={openMenu} id="nav-profile-button">
          {/* add user profile photo here */}
          {/* <img src=""/> */}
          <img src={profilePicturePath}/>
        </button>
        {showMenu && (
          <ul className="profile-dropdown">
            <div>
              <div onClick={redirectToProfilePage} className="dropdown-to-profile-page">
                {/* <img src=""/> */}
                <img src={profilePicturePath}/>
                <h2>{user.first_name}&nbsp;{user.last_name}</h2>
              </div>
            </div>
            <div className="profile-dropdown-log-out" onClick={logout}>
              <div className="profile-dropdown-log-out-outer-icon">
                <i className="profile-dropdown-log-out-icon"/>
              </div>
              <h3>Log out</h3>
            </div>
          </ul>
        )}
       </div>
    </>
  );
}

export default ProfileButton;
