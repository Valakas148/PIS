Веб-сайт для автомобільного салону

Тут розказані кроки як запустити папку:
Спершу у вас має бути скачаний репозиторій,
Структура має бути така:
PIS->(в середині файли .html, 5 папок:CSS,CSV,photo,JS,SVG(з відповідними файлами))

Для запуску проекту потрібне програмне середовище VS Code з скаченим розширенням Live Server,
він має бути скачаний обов'зково для правильної роботи сайту, через нього підтягуються дані з csv файлів на сайт і вносяться також.

Коли скачено Live Server і папка проекту вже відкрита в VS Code, потрібно перевірити який хост Ви отримали.
Клацніть правою кнопкою на файл main_page.html -> Open with Live Server відкриється google сторінка проекту, на адресі сайту можна побачити останні 4 цифри.
У мене допустим так http://127.0.0.1:5500/main_page.html , отже мій localhost:5500.

Треба перевірити у файлах JS\details.js, JS\catalog.js
// URL вашого CSV-файлу
const csvURL = 'http://localhost:5500/CSV/cardealer.csv';
Міняється 4 цифри на ті які ви побачили на адресі сайту.

Тепер можете переглядати веб-сайт. 
