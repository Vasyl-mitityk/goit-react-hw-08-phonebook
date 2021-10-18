import { createAction } from '@reduxjs/toolkit';

// т.к. при http-запросе обрабатывается логика при старте, успешном получении данных и в случае ошибки - создаем отдельный файл для таких операций (phonebook-operation.js). А в этом файле прописываем  actions для этих случаев

//1- для отрисовки всей базы при загрузке приложения
const fetchContactsRequest = createAction('phonebook/fetchContactsRequest'); //при старте
const fetchContactsSuccess = createAction('phonebook/fetchContactsSuccess'); // при успешном получении данных
const fetchContactsError = createAction('phonebook/fetchContactsError'); // в случае ошибки

// 2- addContact
const addContactRequest = createAction('phonebook/addContactRequest'); //при старте
const addContactSuccess = createAction('phonebook/addContactSuccess'); // при успешном получении данных
const addContactError = createAction('phonebook/addContactError'); // в случае ошибки

// 3-deleteContact
const deleteContactRequest = createAction('phonebook/deleteContactRequest'); //при старте
const deleteContactSuccess = createAction('phonebook/deleteContactSuccess'); // при успешном получении данных
const deleteContactError = createAction('phonebook/deleteContactError'); // в случае ошибки

// const deleteContact = createAction('phonebook/delete');

const changeFilter = createAction('phonebook/changeFilter');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // для get
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,

  // addContact,
  addContactRequest,
  addContactSuccess,
  addContactError,

  // deleteContact,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,

  changeFilter,
};
