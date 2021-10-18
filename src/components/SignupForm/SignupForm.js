import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';

// Data
import { authOperations } from '../../redux/authorization';

export default function SignupForm() {
  // Hooks
  // useState
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useDispatch
  const dispatch = useDispatch();

  //Function
  //Получение данных из input
  const handleChange = useCallback(event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        console.warn(`Тип поля name - ${name} не обрабатывается`);
    }
  }, []);

  // Отправка данных из формы
  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      // если отсутствуют данные
      if (!name || !email || !password) {
        alert('Fill the Registration form');
        return;
      }

      // вызов dispatch onRegister
      dispatch(authOperations.register({ name, email, password }));

      // очистка данных в форме
      setName('');
      setEmail('');
      setPassword('');
    },
    [dispatch, name, email, password],
  );

  return (
    <div className="UserMenu">
      <h2 className="header-title">Registration Page</h2>

      {/* форма из bootstrap. Подключенo в index.html */}
      <form
        onSubmit={handleSubmit} //autoComplete="off"
      >
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>

          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>

          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={handleChange}
          />

          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            type="password"
            className="form-control"
            placeholder={'More than 7 symbols'}
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        {/* Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
