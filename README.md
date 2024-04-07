
<h1> Проект: Сервис обращений пользователей </h1>

 Главная цель проекта - пользователь может оставить обращение разработчикам и посмотреть уже имеющиеся обращения со статусом их выполнения.

# Реализованный функционал:
<ul>
  <li>Отправка нового обращения с выбором типа и описанием проблемы</li>
  <li>Просмотр подробной информации о необходимом обращении</li>
  <li>Просмотр всех обращений на главной странице</li>
  <li>Фильтрация по столбцам</li>
</ul>

# Используемые технологии:
Nest.js и TypeScript, React, Redux, Docker, Docker-compose


# Инструкция по запуску:
Чтобы запустить проект понадобится несколько шагов:
1. Зайти в место, где будет запускаться проект: 
   `cd <название папки>`
2. Создать папку:
   `mkdir <название папки>`
3. Войти в папку:
   `cd <название папки>`
4. Клонируем репозиторий:
   `git clone https://github.com/ValeryVigovskaya/user_requests_project.git`
5. Заходим в появившуюся папку:
   `cd user_requests_project`
6. Запустить проект можно командой:
   `docker-compose up`
   после этого на http://localhost:3005/ будет отображен проект
7.  Через Postman можно проверить все существующие роуты