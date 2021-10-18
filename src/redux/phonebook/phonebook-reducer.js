import { createReducer } from '@reduxjs/toolkit'; //для создания редьюсера и рефакторинга кода с помощью функции из toolkit

import { combineReducers } from 'redux'; //для композиции редьюсеров, то есть совмещать много в один

//Data
import actions from './phonebook-actions'; //actions

// import {contactsActions} from './phonebook-actions'

//1- редьюсер для contacts with Toolkit. В createReducer() - 1 параметр - это начальное значение state; 2 - это объект кейсов, где каждый ключ это тип действия, а значение - это редюсер для этого типа
const items = createReducer([], {
  [actions.fetchContactsSuccess]: (_, { payload }) => payload, //чтобы при первой загрузке страницы отрисовывались все contacts из  бекенда

  [actions.addContactSuccess]: (state, { payload }) => [...state, payload],

  [actions.deleteContactSuccess]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload), //берем предыдущий contacts и отфильтровываем все элементы, кроме того у которого id совпадает
});

//2- редьюсер для filter with Toolkit. Когда state не нужен, он объявлен, но не используется, вместо него ставим _
const filter = createReducer('', {
  [actions.changeFilter]: (_, { payload }) => payload,
});

// 3 - редьюсер для loading
const loading = createReducer(false, {
  [actions.fetchContactsRequest]: () => true, //по default - false,загрузка началась, возвращаем => true

  // при выполненении http-запроса (выполнено или ошибка - загрузка (loading) - останавливается)
  [actions.fetchContactsSuccess]: () => false,
  [actions.fetchContactsError]: () => false,

  // повторяем логику при addContact
  [actions.addContactRequest]: () => true,

  [actions.addContactSuccess]: () => false,
  [actions.addContactError]: () => false,

  // повторяем логику при deleteContact
  [actions.deleteContactRequest]: () => true,

  [actions.deleteContactSuccess]: () => false,
  [actions.deleteContactError]: () => false,
});

// 3 - редьюсер для error
const error = createReducer(null, {
  [actions.fetchContactsError]: (_, { payload }) => payload,
  [actions.addContactError]: (_, { payload }) => payload,
  [actions.deleteContactError]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
  loading, //для отображения состояния загрузки во время http-запроса
  error,
});
