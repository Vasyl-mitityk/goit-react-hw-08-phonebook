//1) Проверка состояния логинизации пользователя по token. Когда пользователь незалогинен token=null, когда залогинен и есть token - необходимо, чтобы отрисовывалось UserMenu. Если token есть - то прийдет строка, и при boolen она будет true, если незалогинен - false.

// 2) Наличие token  в local storage не является подтверждением того, что пользователь залогинен. Это будет известно только после ответа с бекенда (isAuthenticated=true).  Чтобы при перезагрузке стриницы текущий пользователь сохранялся, сначала получаем ответ с бекенда, если пользователь залогинен. Поэтому меняем state.auth.token => state.auth.isAuthenticated
const getIsAuthenticated = state => state.auth.isAuthenticated;

// Для отображения name после успешной логинизации в AppBar
const getUsername = state => state.auth.user.name;

// eslint-disable-next-line import/no-anonymous-default-export
export default { getIsAuthenticated, getUsername };
