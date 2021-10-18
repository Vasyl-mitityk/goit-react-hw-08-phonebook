import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; //// configureStore - createStore для toolkit; getDefaultMiddleware - список default Middlewares (прослоек).

import logger from 'redux-logger'; // прослойка (middleware) при console.log() отображает action (до и после)

import storage from 'redux-persist/lib/storage'; //для local storage

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'; //позволяет записывать какие-либо данные куда-либо, например в local storage. persistStore - для всего store; persistReducer - для одного редьюсера. Все остальное - для проработки ошибок в консоли

// Reducers
import phonebookReducer from './phonebook/phonebook-reducer';

import { authReducers } from './authorization';

// создаем новый стек прослоек, который вернет список default Middlewares (прослоек), к которому добавляем еще logger =  прослойка (middleware) при console.log() отображает action (до и после) и добавляем его в reducer

const middleware = [
  // getDefaultMiddleware - список default Middlewares (прослоек)
  ...getDefaultMiddleware({
    // объект настроек для проработки ошибок в консоли при проверке целостности state, т.е. указываем что нужно игнорировать, чтобы консоль не светилась красными предупреждениями
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  //logger - прослойка (middleware) при console.log() отображает action (до и после). Чтобы ее добавить - устанавливаем и import logger из redux-logger
  logger, //прослойка (middleware) при console.log() отображает action (до и после) и добавляем его в reducer
];

// настройки для сохранения данных в local storage
const authPersistConfig = {
  key: 'authorization', //название ключа, который будет отображаться в local storage

  storage,

  whitelist: ['token'], //что отображать в local storage
};

// Для каждого объекта в глобальном state свой отдельный Reducer. И внизу этого файла есть корневой редьюсер (rootReducer), где ключ - это название компонента со state для него, а значение - редьюсер, который отвечает за него.

//createStore для toolkit -configureStore. DevTools у него уже под капотом. npm redux-devtools-extension можно удалять
const store = configureStore({
  // параметры configureStore из документации (reducer, devTools,  middleware и есть еще другие опции)

  // reducer: {}, под капотом уже использует combineReducers  from 'redux' для композиции редьюсеров, то есть совмещать много в один.
  reducer: {
    // тот reducer, который нужен для persist сперва оборачиваем в persistReducer.
    contacts: phonebookReducer,
    auth: persistReducer(authPersistConfig, authReducers), //для обработки authorization. Оборачиваем в persistReducer (1 аргумент - config; 2 - reducer, который обрабатывает)
  },
  middleware, //возвращает список default Middlewares (прослоек), к которому добавляем еще logger =  прослойка (middleware) при console.log() отображает action (до и после)

  devTools: process.env.NODE_ENV === 'development', // чтобы DevTools были доступны только в разработке. Переменная окружения из node - process.env. NODE_ENV - описывает какой сейчас режим разработки: production || development
});

//Создаем  persistor - обертка над store, которая при изменении store будет записывать в local storage и обновлять его.
const persistor = persistStore(store);

// И export persistor  и store
// eslint-disable-next-line import/no-anonymous-default-export
export default { persistor, store };

// eslint-disable-next-line import/no-anonymous-default-export
// export default store;
