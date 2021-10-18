import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Data
import { authSelectors } from '../redux/authorization';
// когда пользователь залогинен, ему не должны отображаться на определенные страницы, например регистрации и логинизации;  restricted - ограниченый маршрут

/**
 * - Если маршрут ограниченный (т.е. когда пользователь залогинен, он не должен попасть на определенные страницы, например страницы регистрации и логинизации), и пользователь залогинен, рендерит редирект на /todos
 * - В противном случае рендерит компонент
 */

export default function PublicRoute({
  //деструктуризируем все props из App.js

  isAuthenticated, //из authSelectors
  redirectTo,
  children,
  ...routeProps
  //и все остальное (path, restricted)
}) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <Route {...routeProps}>
      {/* // рендер по условию  если пользователь залогинен  && и маршрут ограниченый (restricted), то перенаправление */}
      {isLoggedIn && routeProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        children
      )}
    </Route>
  );
}
