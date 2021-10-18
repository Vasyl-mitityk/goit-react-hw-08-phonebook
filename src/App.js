import React, { Suspense, lazy, useEffect } from 'react';

import { Switch } from 'react-router-dom';

import { useDispatch } from 'react-redux';

// Data
import { authOperations } from './redux/authorization';

// Route
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

// Components
import Container from './components/Container';
import AppBar from './components/AppBar';

// Pages. Lazy. Chunk
const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);

const ContactsPage = lazy(() =>
  import('./pages/ContactsPage' /* webpackChunkName: "contacts-page" */),
);

const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "register-page" */),
);

const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "login-page" */),
);

// //  ЖИЗНЕННЫЕ ЦИКЛЫ
//   componentDidMount() {
//     //вызов onGetCurrentUser, в operations прописана логика  для того, чтобы сохранить текущего пользователя, а не выполнять логизацию каждый раз после обновления страницы; 1) сохраняем token в local storage и получаем к нему доступ через getState
//     this.props.onGetCurrentUser();
//   }

// const mapDispatchToProps = {
//   onGetCurrentUser: authOperations.getCurrentUser,
// };

export default function App() {
  // useDispatch
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    // при первом рендере страницы (аналог componentDidMount), вызов authOperations.getCurrentUser, в operations прописана логика  для того, чтобы сохранить текущего пользователя, а не выполнять логизацию каждый раз после обновления страницы; 1) сохраняем token в local storage и получаем к нему доступ через getState
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<p>Loading in progress...</p>}>
        <Switch>
          <PublicRoute exact path="/">
            <HomePage />
          </PublicRoute>
          {/* чтобы не отображать содержимое Contacts страницы незалогиненному пользователю */}
          <PrivateRoute path="/contacts" redirectTo="/login">
            <ContactsPage />
          </PrivateRoute>

          {/* когда пользователь залогинен, ему не должны отображаться на определенные страницы, например регистрации и логинизации;  restricted - ограниченый маршрут */}
          <PublicRoute path="/register" restricted redirectTo="/contacts">
            <RegisterPage />
          </PublicRoute>

          <PublicRoute path="/login" restricted redirectTo="/contacts">
            <LoginPage />
          </PublicRoute>
        </Switch>
      </Suspense>
    </Container>
  );
}
