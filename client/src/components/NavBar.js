import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/auth.context";

export const NavBar = () => {

  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const logoutHandler = e => {
    e.preventDefault();
    authCtx.logout();
    history.push('/')
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1 pl-15">
        <span className="brand-logo">Link reduction</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>Exit</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};