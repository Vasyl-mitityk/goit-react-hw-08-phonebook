1. npx create-react-app (установка реакта);
2. npm install --save-dev prettier eslint, npx mrm@2 lint-staged (Настройка
   линтеров)
3. link "homepage": "https://myusername.github.io/my-app", npm run build, npm
   install --save gh-pages, \
   "scripts": { "predeploy": "npm run build", "deploy": "gh-pages -d build",}, npm
   run deploy (GitHub Pages Deployment)
4. npm install --save prop-types (prop-types щоб вони працювали обовязково в
   папку js--- import PropTypes from 'prop-types';)
5. @import-normalize; установка нормолайза
6. npm i redux react-redux

<!--1. регистрируем свой профиль (если еще его нет) в
https://app.netlify.com/
2. создаем в корне проекта файл netlify.toml
с настройками:
[build]
publish = "build"
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
3. устанавливаем локально командную строку netlify
npm install netlify-cli
4. устанавливаем связь со своим профилем Netlify
netlify login
или, если бъет ошибку, то
npm run netlify login
5. в скриптах меняем
"deploy": "gh-pages -d build"
на
  "predeploy": "npm run build",
"deploy": "netlify deploy -p"
не забываем удалить свойство
"homepage": "/",
6. запускаем деплой
npm run deploy
выбираем create new site
Enter
Enter
пишем имя, которое будет перед netlify.com
получаем ссылку на свой сайт из консоли или командой
netlify open --site
7. Радуемся, но не забываем
ссылку положить в репо:виктория_жест::оттенок_кожи_2: (отредактировано)  -->
