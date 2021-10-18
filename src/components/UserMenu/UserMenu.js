import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Data
import { authSelectors, authOperations } from '../../redux/authorization';

import defaultAvatar from './default-avatar.png';

// Styles
import './UserMenu.scss';

export default function UserMenu() {
  // useSelector
  const name = useSelector(authSelectors.getUsername);

  // useDispatch
  const dispatch = useDispatch();
  const onLogout = useCallback(
    () => dispatch(authOperations.logOut()),
    [dispatch],
  ); //анонимная функция, которая каждый раз вызвает UserMenu() и будет создаваться новая ссылка и button Logout будет перерендериваться каждый раз, хотя это ненужно. Чтобы этого избежать используем hook для мемоизации - useCallback

  return (
    <div className="usermenu-container">
      <img src={defaultAvatar} alt="" width="32" className="usermenu-avatar" />

      <span className="username">Welcome, {name}</span>

      <button type="button" className="btn btn-secondary" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
