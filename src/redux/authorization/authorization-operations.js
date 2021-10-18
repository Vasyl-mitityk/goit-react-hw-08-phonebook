import axios from 'axios';

// Data
import authActions from './authorization-actions';

// axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  // у axios  на определенный defaults можно на определенный header привязать какое-либо свойство для всех будущих http-запросов. Указываем этот заголовок Authorization, когда пользователь или зарегистрировался или залогинился, т.е. когда получаю token, который, чтобы каждый раз его не прописывать записываем сразу глобально
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`; //исходя из этого привязывает свойство Bearer - это Носитель, к которому указываем, что Носителем будет полученный token
  },
  unset() {
    axios.defaults.headers.common.Authorization = ''; //вызов unset() снимает Носитель Bearer
  },
};

/*
 * POST @ /users/signup
 * body { name, email, password } - это credentials
 *
 * После успешной регистрации добавляем токен в HTTP-заголовок
 */
const register = credentials => async dispatch => {
  dispatch(authActions.registerRequest());

  try {
    const response = await axios.post('/users/signup', credentials);

    // вызов token, т.е. set  token на загаловок Authorization, чтобы последующие http-запросы уже отправлялись с этим заголовком с конкретным  token
    token.set(response.data.token);

    dispatch(authActions.registerSuccess(response.data));
  } catch (error) {
    alert('You entered incorrect data. Check your name, login and password');
    dispatch(authActions.registerError(error.message));
  }
};

/*
 * POST @ /users/login
 * body: { email, password } - credentials
 * После успешного логина добавляем токен в HTTP-заголовок
 */
const logIn = credentials => async dispatch => {
  dispatch(authActions.loginRequest());

  try {
    const response = await axios.post('/users/login', credentials);

    // вызов token, т.е. set  token на загаловок Authorization, чтобы последующие http-запросы уже отправлялись с этим заголовком с конкретным  token
    token.set(response.data.token);

    dispatch(authActions.loginSuccess(response.data));
  } catch (error) {
    alert('You entered incorrect data, check your login and password');
    dispatch(authActions.loginError(error.message));
  }
};

/*
 * POST @ /users/logout
 * headers:
 *    Authorization: Bearer token
 *
 * 1. После успешного логаута, удаляем токен из HTTP-заголовка
 */
const logOut = () => async dispatch => {
  dispatch(authActions.logoutRequest());

  try {
    await axios.post('/users/logout');

    // При Logout  token  становится невалидным и его необходимо снять из заголовка Authorization
    token.unset();

    dispatch(authActions.logoutSuccess());
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
  }
};

/*
 * GET @ /users/current
 * headers:
 *    Authorization: Bearer token
 *
 * 1. Забираем токен из стейта через getState()
 * 2. Если токена нет, выходим не выполняя никаких операций
 * 3. Если токен есть, добавляет его в HTTP-заголовок и выполянем операцию
 */

// Для того, чтобы сохранить текущего пользователя, а не выполнять логизацию каждый раз после обновления страницы; 1) сохраняем token в local storage и получаем к нему доступ через getState
const getCurrentUser = () => async (dispatch, getState) => {
  const {
    //берем весь state, благодаря вызову getState, и выделяем из него auth, и его свойство token. Это делается для того, чтобы получить данные из local storage, перед отправкой нового запроса
    auth: { token: persistedToken },
  } = getState();

  //проверка, если token нет - return и не выполняем никаких действий. Не нужно получать текущего пользователя
  if (!persistedToken) {
    return;
  }

  //во всех других случаях - если token есть, тогда добавляем его в http-заголовок (делаем token.set) и обрабатываем dispatch для request, success, error
  token.set(persistedToken);

  dispatch(authActions.getCurrentUserRequest());

  try {
    //в результате http-запроса возвращает данные, но без token!!!
    const response = await axios.get('/users/current');

    dispatch(authActions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { register, logIn, logOut, getCurrentUser };
