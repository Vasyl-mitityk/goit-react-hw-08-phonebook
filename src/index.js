import React from 'react';

import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'; //Для подключение  глобального store  к Redux. Достаем  Provider  (пакет из react-redux) - компонент, который оборачивает все наше приложение, он ставится поверх App, и он через контекст (контекст - это глобальная переменная) может прокидывать в глубину и на любую вложенность дополнительный функционал.

import { PersistGate } from 'redux-persist/integration/react'; // используется для реализации redux-persist

import { BrowserRouter } from 'react-router-dom';

// Data
//  Для передачи Provider в props store, с ссылкой на наше хранилище  сначала импортируем этот файл
import store from './redux/store';
// Components
import App from './App';

// Styles
import './index.css';
import 'modern-normalize/modern-normalize.css'; //подключение стилей для normalize

ReactDOM.render(
  <React.StrictMode>
    {/* Для подключения глобального store к Redux. Достаем Provider (пакет из react-redux) -
    компонент, который оборачивает все наше приложение, он ставится поверх App,
    и он через контекст (контекст - это глобальная переменная) может прокидывать
    в глубину и на любую вложенность дополнительный функционал. Provider в props передаем store (файл которого перед тем import) , с ссылкой на наше хранилище  */}
    <Provider store={store.store}>
      {/*PersistGate используется для реализации redux-persist. В props передаем 1)loading, в который можно указать какой-либо preloader; 2) persistor  - ссылка на сам persistor, который заимпортирован из файла store.js*/}
      <PersistGate loading={null} persistor={store.persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
