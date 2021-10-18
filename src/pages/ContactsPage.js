import React, { Component } from 'react';
import { connect } from 'react-redux';

// Data
import { contactsOperations, contactsSelectors } from '../redux/phonebook';

// Components
import ContactsForm from '../components/ContactsForm';

import Filter from '../components/Filter';

import ContactList from '../components/ContactList';

class ContactsPage extends Component {
  // ЖИЗНЕННЫЕ ЦИКЛЫ
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div className="App">
        <h2 className="App-title">Contacts</h2>

        <ContactsForm />

        <Filter />

        {/* добавляем отображение Loading при открытии страницы при загрузке данных*/}
        {this.props.isLoadingContacts && <h2>Loading...</h2>}

        <ContactList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoadingContacts: contactsSelectors.getLoading(state), //с использованием selectors
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
