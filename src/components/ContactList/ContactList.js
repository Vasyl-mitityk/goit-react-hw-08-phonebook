import React from 'react';

import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

// Data
import { contactsOperations, contactsSelectors } from '../../redux/phonebook';

import s from './ContactList.module.css';

export default function ContactList() {
  // useSelector
  const contacts = useSelector(contactsSelectors.getFilteredContacts);

  // useDispatch
  const dispatch = useDispatch();
  const onDeleteContact = id => dispatch(contactsOperations.deleteContact(id));

  return (
    <ul className={s.ContactsList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.ContactsItem}>
          {name}: {number}
          <button
            type="button"
            className={s.ContactsBtn}
            onClick={() => {
              onDeleteContact(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
