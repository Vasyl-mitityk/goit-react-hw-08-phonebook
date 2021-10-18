import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Data
import { authSelectors } from '../../redux/authorization';

// Styles
import './Navigation.scss';

export default function Navigation() {
  // useSelector
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <nav>
      <NavLink
        exact
        to="/"
        className="nav-link"
        activeClassName="active-nav-link"
      >
        Home
      </NavLink>
      {/* рендер по условию, чтобы страница Заметки не отображалась вообще, если пользователь незалогинен */}
      {isLoggedIn && (
        <NavLink
          exact
          to="/contacts"
          className="nav-link"
          activeClassName="active-nav-link"
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
