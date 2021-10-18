import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Data
import { authOperations } from '../../redux/authorization';

export default function LoginPage() {
  // Hooks
  // useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useDispatch
  const dispatch = useDispatch();
  // const onLogin = dispatch(authOperations.logIn({ email, password }));

  // Function
  //Получение данных из input
  const handleChange = useCallback(event => {
    // console.log(value);
    const { name, value } = event.target;

    switch (name) {
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

      // // если отсутствуют данные
      // console.log(email);
      // console.log(password);
      if (!email || !password) {
        alert('Fill the Login form');
        return;
      }

      // вызов dispatch onLogin
      dispatch(authOperations.logIn({ email, password }));

      // очистка данных в форме
      setEmail('');
      setPassword('');
    },
    [dispatch, email, password],
  );

  return (
    <div className="UserMenu">
      <h2 className="header-title">Login Page</h2>

      {/* форма из bootstrap. Подключение в index.html */}
      <form
        onSubmit={handleSubmit} //autoComplete="off"
      >
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
