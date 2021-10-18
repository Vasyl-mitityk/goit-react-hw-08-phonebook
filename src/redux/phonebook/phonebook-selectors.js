import { createSelector } from '@reduxjs/toolkit'; ////создание мемоизиронного селектора

// Рефакторинг из App.js ( mapStateToProps). Принимает весь state. Возвращает только необходимую, малую часть - state.contacts.loading
const getLoading = state => state.contacts.loading;

// Рефакторинг из ContactsForm.js ( mapStateToProps).
const getAllContacts = state => state.contacts.items;

// Рефакторинг из Filter.js ( mapStateToProps)
const getFilter = state => state.contacts.filter;

// Рефакторинг из ContactList.js ( mapStateToProps)
// c применением мемоизиронного селектора. В createSelector 1 аргумент - передаю буквально ссылку на те значения, от которых зависит мемоизация; 2 - перадаю функцию, которая непосредственно будет делать вычисления. В нее аргументами поступает результат вызова функций из аргумента 1
const getFilteredContacts = createSelector(
  [getAllContacts, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    //   Тело этой функции выполнится только в том случае, если изменится или contacts или filter. Т.е. contacts и filter - кешируются. Если из предыдущего вызова contacts или filter не изменились - то return... не произойдет, функция из кеша вернет старый готовый массив, который там хранится как последняя выполненная операция
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter),
    );
  },
);
// Рефакторинг из ContactList.js ( mapStateToProps)
// ДО
// вычисляемые свойства для фильтрации. Отфильтровываем те contacts, которые includes то, что мы записали в input Фильтр по имени и в ContactList рендерим не все <ContactList
//   contacts={contacts}, а только отфильтрованые, т.е.  contacts={getFilteredContacts}/>

// const getFilteredContacts = (allContacts, filter) => {
//   // для чистоты кода выведем filter.toLowerCase() в отдельную переменную
//   const normalizedFilter = filter.toLowerCase();

//   return allContacts.filter(
//     ({ name, number }) =>
//       name.toLowerCase().includes(normalizedFilter) ||
//       number.toLowerCase().includes(normalizedFilter),
//   );
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getLoading,
  getAllContacts,
  getFilter,
  getFilteredContacts,
};
