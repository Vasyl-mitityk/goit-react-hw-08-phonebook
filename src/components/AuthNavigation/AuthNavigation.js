import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthNavigation = () => {
  return (
    <div>
      <NavLink
        exact
        to="/register"
        className="nav-link"
        activeClassName="active-nav-link"
      >
        Sign up
      </NavLink>

      <NavLink
        exact
        to="/login"
        className="nav-link"
        activeClassName="active-nav-link"
      >
        Login
      </NavLink>
    </div>
  );
};

export default AuthNavigation;
