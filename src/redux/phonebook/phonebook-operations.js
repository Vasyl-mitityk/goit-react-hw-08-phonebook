import axios from 'axios'; //для fetch запросов

import actions from './phonebook-actions'; //синхронные actions

// Get @/contacts
//1- FETCH запрос. Для отрисовки contacts  из  бекенда  при загрузке приложения
const fetchContacts = () => dispatch => {
  // для обработки request при старте. Просто отправляем  type (без payload), который затягиваем из phonebook-actions.js, для того, чтобы можно было поставить флажок загрузки
  dispatch(actions.fetchContactsRequest());

  axios
    .get('/contacts')
    .then(({ data }) => dispatch(actions.fetchContactsSuccess(data)))
    .catch(error => dispatch(actions.fetchContactsError(error)));
};

//2- ADD contact. для добавления contact
const addContact =
  ({ name, number }) =>
  dispatch => {
    // здесь делаем http-запрос и по результату dispatch выполняются синхронные actions, т.е результаты http-запроса, которые отправляем с данными дальше по цепочке
    const contact = {
      name,
      number,
    };

    dispatch(actions.addContactRequest());

    axios
      .post('/contacts', contact)
      // и данные нужно dispatch как объект action. Прописываем dispatch в случаем успеха - это вызываем из actions метод addTodoSuccess, а payload - прокидываем data в   и в случае ошибки(error)
      .then(({ data }) => dispatch(actions.addContactSuccess(data)))
      .catch(error => dispatch(actions.addContactError(error)));
  };

//3- DELETE contact
const deleteContact = contactId => dispatch => {
  dispatch(actions.deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(actions.deleteContactSuccess(contactId)))
    .catch(error => dispatch(actions.deleteContactError(error)));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchContacts, addContact, deleteContact };
