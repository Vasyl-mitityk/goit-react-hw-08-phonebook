import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

// Data
import authActions from './authorization-actions';

const initialUserState = { name: null, email: null };

// обработка данных, которые возвращаются с бекенда (если все ок - user && token; если ошибка в запросе - error)
const user = createReducer(initialUserState, {
  //регистрация при успешном запросе на бекенд, записываем в глобальный state (initialUserState) - user (свойство, которое вернул бекенд)
  [authActions.registerSuccess]: (_, { payload }) => payload.user,

  // логинизация. бекенд возвращает то же самое, что и при регистрации
  [authActions.loginSuccess]: (_, { payload }) => payload.user,

  // для Logout никакие данные не нужны, set начальное состояние initialUserState
  [authActions.logoutSuccess]: () => initialUserState,

  // Для того, чтобы сохранить текущего пользователя, а не выполнять логизации каждый раз после обновления страницы; и чтобы продолжал отображаться username AppBar.js после обновления страницы 1) сохраняем token в local storage и получаем к нему доступ через getState
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
});

// редьюсер для обработки token
const token = createReducer(null, {
  [authActions.registerSuccess]: (_, { payload }) => payload.token,

  // логинизация. бекенд возвращает то же самое, что и при регистрации
  [authActions.loginSuccess]: (_, { payload }) => payload.token,

  // для Logout  начальное состояние  token сбрасываем в null
  [authActions.logoutSuccess]: () => null,
});

// код дублируется в error, для улучшения рефакторим
const setError = (_, { payload }) => payload;

// редьюсер для обработки ошибок
const error = createReducer(null, {
  [authActions.registerError]: setError,
  [authActions.loginError]: setError,
  [authActions.logoutError]: setError,
  [authActions.getCurrentUserError]: setError,
});

//Наличие token  в local storage не является подтверждением того, что пользователь залогинен. Это будет известно только после ответа с бекенда (isAuthenticated=true).  Чтобы при перезагрузке стриницы текущий пользователь сохранялся, сначала получаем ответ с бекенда, если пользователь залогинен
const isAuthenticated = createReducer(false, {
  [authActions.registerSuccess]: () => true, //пользователь успешно зарегестрирован

  [authActions.loginSuccess]: () => true, //успешная логинизация

  [authActions.getCurrentUserSuccess]: () => true, //успешная авторизация

  [authActions.getCurrentUserRequest]: () => true, //костыль, чтобы при перезагрузке страницы пока идет авторизация пользователя, чтобы не перекидывало на несколько секунд на страницу логинизации

  // при ошибках isAuthenticated=false
  [authActions.registerError]: () => false,
  [authActions.loginError]: () => false,
  [authActions.getCurrentUserError]: () => false,

  [authActions.logoutSuccess]: () => false, //когда успешно разлогинен
});

export default combineReducers({
  user,
  token,
  error,
  isAuthenticated,
});
