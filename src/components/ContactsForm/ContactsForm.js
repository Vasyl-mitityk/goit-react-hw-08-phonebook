import React, { useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// Data
import { contactsOperations, contactsSelectors } from '../../redux/phonebook';

// Styles
import s from './ContactsForm.module.css';

export default function ContactsForm() {
  // Hooks
  // useState
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // useSelector
  const contacts = useSelector(contactsSelectors.getAllContacts);

  // useDispatch
  const dispatch = useDispatch();

  // Функции
  const handleChange = useCallback(event => {
    // console.log(event.currentTarget.value);

    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        console.warn(`Тип поля name - ${name} не обрабатывается`);
    }
  }, []);

  // для отправки (submit) формы
  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      // console.log(this.state);

      //  проверка на возможность добавлять контакты, имена которых уже есть в телефонной книге. При попытке выполнить такое действие выводим alert с предупреждением.
      if (contacts.some(elm => elm.name.toLowerCase() === name.toLowerCase())) {
        return alert(`${name} is already in contacts`);
      }
      if (
        contacts.some(elm => elm.number.toLowerCase() === number.toLowerCase())
      ) {
        return alert(`${number} is already in contacts`);
      }

      //   во время отправки (submit) формы передаем данные из  useState (name, number)
      dispatch(contactsOperations.addContact({ name, number }));

      // вызов reset для очистки  данных формы,
      setName('');
      setNumber('');
    },
    [dispatch, contacts, name, number],
  );

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label>
        <span className={s.title}>Name</span>
        <input
          className={s.inputName}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={handleChange}
        />
      </label>

      <label>
        <span className={s.title}>Number</span>

        <input
          className={s.inputName}
          type="tel"
          name="number"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className={s.formBtn}>
        Add Contact
      </button>
    </form>
  );
}
