import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Data
import { authSelectors } from '../../redux/authorization';

// Components
import Navigation from '../Navigation';
import AuthNavigation from '../AuthNavigation';
import UserMenu from '../UserMenu';

// Styles
import './AppBar.scss';

export default function AppBar({ isAuthenticated }) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <header className="header">
      <Navigation />

      {/* рендер по условию - prop {isLoggedIn} - залогиненный или незалогиненный пользователь. В зависимости от этого будет рендерить либо <UserMenu - информация о пользователе /> или <AuthNav  */}
      {isLoggedIn ? <UserMenu /> : <AuthNavigation />}
    </header>
  );
}

AppBar.propTypes = {
  isLoggedIn: PropTypes.bool,
};
