import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Data
import { authSelectors } from '../redux/authorization';

// вместо компонента Route в App.js будет другой  PrivateRoute. Это нужно для того, чтобы при переходе на какую-либо страницу приложения ее содержимое  НЕ ДОЛЖНО отрисовываться, если пользователь незалогинен

// PrivatePoute будет получать те же данные, что и обычный Route в App.js, но будет добавлять соответствущие условия и проверки, чтобы незалогиненый пользователь не мог перейти на страницу приложения (Contacts), предназначенную только для залогиненных

//  Если маршрут приватный и пользователь залогинен, рендерит компонент
//  В противном случае рендерит Redirect на /login

export default function PrivateRoute({
  //деструктуризируем все props из App.js

  isAuthenticated, //из authSelectors
  redirectTo,
  children,
  ...routeProps //и все остальное (path)
}) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <Route {...routeProps}>
      {/* // рендер по условию. Если пользователь авторизирован, то отрендери Component (страница Contacts), если нет - переведи на страницу Login */}

      {isLoggedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}
