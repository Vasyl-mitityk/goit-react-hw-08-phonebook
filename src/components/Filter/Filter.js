import React from 'react';

import { useDispatch, useSelector } from 'react-redux'; //для подключения к глобальному store.js

import s from './Filter.module.css';
// Data
import { contactsActions, contactsSelectors } from '../../redux/phonebook';

export default function Filter() {
  // useSelector
  const value = useSelector(contactsSelectors.getFilter);

  // useDispatch
  const dispatch = useDispatch();
  const onChange = event =>
    dispatch(contactsActions.changeFilter(event.target.value));

  return (
    <label>
      <span className={s.title}>Find contacts by name</span>
      <br />
      <input
        type="text"
        className={s.inputName}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
